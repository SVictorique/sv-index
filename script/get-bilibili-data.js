const axios = require("axios");
const fs = require("fs");
const path = require("path");

const apiUrl = 'https://api.bilibili.com/pgc/season/index/result?order=6&sort=0&type=1';
const pageSize = 1000;
const rootPath = path.resolve(__dirname);

// seasonType 1:动漫 ;5:电视剧
const getData = async (seasonType, type) => {
  let data = [];

  const { data: res } = await axios.get(`${apiUrl}&season_type=${seasonType}&page=1&pagesize=1`);
  const total = res.data.total;
  for (let i = 1; (i - 1) * pageSize < total; i++) {
    const { data: r } = await axios.get(`${apiUrl}&season_type=${seasonType}&page=${i}&pagesize=${pageSize}`);
    data.push(r.data.list);
    data = data.flat();

    const batchSize = 10;
    let promises = [];
    for (let j = 0; j < r.data.list.length; j++) {
      const { cover } = r.data.list[j];
      const savePath = path.join(rootPath, '../public/bilibili/image/' + cover.substring(cover.lastIndexOf("/") + 1));
      console.log(`${seasonType} ${i} ${savePath}`)
      if (!fs.existsSync(savePath)) {
        const folderPath = savePath.substring(0, savePath.lastIndexOf("/")+1)
        fs.mkdirSync(folderPath, { recursive: true, })

        promises.push(new Promise(resolve => {
          axios.get(cover, {
            responseType: 'stream'
          }).then(response => {
            response.data.pipe(fs.createWriteStream(savePath));
            resolve();
          }).catch((e) => {
            console.error(e);
            resolve();
          })
        }));
      }

      if (j % batchSize === 0) {
        await Promise.all(promises);
        promises = [];
        await new Promise((resolve) => {
          setTimeout(() => resolve(), 100);
        });
      }
    }
    await Promise.all(promises);
    await new Promise((resolve) => {
      setTimeout(() => resolve(), 100);
    });
  }

  const folderPath = path.join(rootPath, '../public/bilibili/');
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, {
      recursive: true,
    })
  }
  fs.writeFileSync(path.join(folderPath, `bilibili-${type}.json`), JSON.stringify(data));
}

module.exports.getAnimes = async () => getData(1, 'anime');
module.exports.getMovies = async () => getData(2, 'movie');
module.exports.getTeleplays = async () => getData(5, 'teleplay');
module.exports.getVarieties =async () => getData(7, 'variety');
