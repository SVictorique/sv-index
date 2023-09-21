const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");
const getData = async (type) => {
  let filterType;
  if (type === 'teleplay') {
    filterType = "电视剧";
  } else if (type === 'anime') {
    filterType = "动漫";
  } else if (type === 'movie') {
    filterType = '电影';
  } else if (type === 'variety') {
    filterType = '综艺';
  } else {
    return;
  }
  const url = `https://www.youku.com/channel/webcomic/list?filter=type_${filterType}_sort_1`;

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
  const folderPath = path.join(rootPath, '../public/youku/');
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, {
      recursive: true,
    })
  }
  fs.writeFileSync(path.join(folderPath, `youku-${type}.json`), JSON.stringify(videoInfos));

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

module.exports.getAnimes = async () => getData('anime');
module.exports.getTeleplays = async () => getData('teleplay');
module.exports.getMovies = async () => getData('movie');
module.exports.getVarieties = async () => getData('variety');

module.exports.getAnimes();
module.exports.getTeleplays();
module.exports.getMovies();
module.exports.getVarieties();
