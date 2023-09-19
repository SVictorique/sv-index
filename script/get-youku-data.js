const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const run = async () => {
  const url = "https://www.youku.com/channel/webtv/list?filter=type_电视剧_sort_1";
  const browser = await puppeteer.launch({headless: 'new'});
  const page = await browser.newPage();

  await page.goto(url);
  await page.setViewport({width: 1080, height: 1024});

  for (let i=0; i<10; i++) {
    console.info(`scroll ${i}`)
    const res = await scrollPage(page);
    console.log(res)
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 1000);
    })
  }

  const selector = await page.waitForSelector('.videolist_container_inner');

  const videoInfos = await getVideoInfos(selector, page);
  console.log(videoInfos);
  const rootPath = path.resolve(__dirname);
  fs.writeFileSync(path.join(rootPath, "../public/youku/youku-teleplay.json"), JSON.stringify(videoInfos));

  await browser.close();
}

const getVideoInfos = async (selector) => {
  return await selector.evaluate(el => {
    const elements = [];
    for (const c of el.getElementsByClassName('g-col')) {
      const a = c.getElementsByClassName('aplus_exp')[0];
      const info = {
        title: a.getAttribute("title"),
        url: 'https:' + a.getAttribute("href"),
        cover: a.childNodes[0].getAttribute("src"),
        updateStatus: a.childNodes[3].childNodes[0].innerHTML,
        subTitle: c.getElementsByClassName('categorypack_subtitle')[0]?.innerHTML,
      };

      elements.push(info);
    }
    return elements;
  });
}

const scrollPage = async (page) => {
  return page.evaluate( () => {
    const container = document.getElementsByClassName("videolist_s_container")[0]
    if (container) {
      for (let y = 0; y <= 100; y++) {
        container.scrollTo({
          left: 0,
          top: container.scrollTop + 1000
        })
      }
      return container.scrollHeight
    } else {
      return document.body.innerHTML
    }
  })
}

run()
