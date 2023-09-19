const host =  'https://poxiao.com';
const {JSDOM} = require("jsdom");
const axios = require("axios");
const path = require("path");
const fs = require("fs");
let utf8decoder = new TextDecoder("GBK");

const getData = async (type) => {
  const { data } = await axios.get(`${host}/type/${type}/`, {
    responseType: "arraybuffer", // 关键步骤
    responseEncoding: "utf8",
  });
  let utf8decoder = new TextDecoder("GBK");
  let html = utf8decoder.decode(data);

  const dom = new JSDOM(html).window.document;

  const total = dom.getElementsByClassName('list-pager')[0].children[0].children[0].innerHTML;

  const batchSize = 30;

  const list = [];
  let promises = [];
  const maxPage = total % 20 === 0 ? total / 20 : total / 20 + 1;
  for (let i = 1; i<= maxPage; i++) {
    promises.push(fetchData(type, i))
    if (i % batchSize === 0) {
      const l = await Promise.all(promises)
      list.push(l.flat())
      promises = [];
    }
  }
  const l = await Promise.all(promises)
  list.push(l.flat())

  const rootPath = path.resolve(__dirname);
  fs.writeFileSync(path.join(rootPath, `../public/poxiao/poxiao-${type}.json`), JSON.stringify(list.flat()));
}

const fetchData = async (type, pageNo) => {
  try {
    console.info(`fetch page %s for type ${type}`, pageNo)

    let url = '';
    if (pageNo === 1) {
      url = `${host}/type/${type}/`;
    } else {
      url = `${host}/type/${type}/index_${pageNo}.html`
    }

    const {data} = await axios.get(url, {
      responseType: "arraybuffer", // 关键步骤
      responseEncoding: "utf8",
    });

    let html = utf8decoder.decode(data);

    const dom = new JSDOM(html).window.document;

    const ul = dom.getElementById("main")
      .getElementsByClassName('content')[0].children[0];

    const list = [];
    for (const li of ul.children) {
      if (!li.innerHTML.trim()) {
        continue;
      }

      const h3 = li.getElementsByTagName('h3')[0];
      const img = li.getElementsByTagName('img')[0];
      const jjzl = li.getElementsByClassName('jjzl')[0];
      let cover = img.getAttribute('src');
      if (!cover.startsWith('http')) {
        cover = host + cover;
      }

      const data = {
        name: h3.getElementsByTagName('a')[0].innerHTML,
        href: host + h3.getElementsByTagName('a')[0].getAttribute('href'),
        cover,
        score: h3.getElementsByTagName('em')[0].innerHTML,
        director: subIndexOf(jjzl.children[0].innerHTML, "："),
        performer: subIndexOf(jjzl.children[1].innerHTML, "："),
        type: subIndexOf(jjzl.children[2].innerHTML, "："),
        country: subIndexOf(jjzl.children[3].innerHTML, "："),
        lang: subIndexOf(jjzl.children[4].innerHTML, "："),
        time: subIndexOf(jjzl.children[5].innerHTML, "："),
      };
      list.push(data)
    }

    return list;
  } catch (e) {
    console.error(pageNo);
    console.error(e);
  }
};

const subIndexOf = (value, split) => {
  return value.substring(value.indexOf(split) + 1)
};

module.exports.getMovies = async () => {
  return getData('movie');
};

module.exports.getTeleplays = async () => {
  return getData('teleplay');
};

module.exports.getAnimes = async () => {
  return getData('anime');
};
