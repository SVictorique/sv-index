const axios = require("axios");
const fs = require("fs");
const path = require("path");

const apiUrl = 'https://api.bilibili.com/pgc/season/index/result?st=1&order=0&sort=0&type=1';
const pageSize = 1000;
const rootPath = path.resolve(__dirname);

// seasonType 1:动漫 ;5:电视剧
const getData = async (seasonType) => {
  let data = [];

  const { data: res } = await axios.get(`${apiUrl}&season_type=${seasonType}&page=1&pagesize=1`);
  const total = res.data.total;
  for (let i = 1; (i - 1) * pageSize < total; i++) {
    const { data: r } = await axios.get(`${apiUrl}&season_type=${seasonType}&page=${i}&pagesize=${pageSize}`);
    data.push(r.data.list);
    data = data.flat();

    const promises = [];
    for (const { cover } of r.data.list) {
      const savePath = path.join(rootPath, '../public/bilibili/' + cover.substring(cover.lastIndexOf("/") + 1));
      console.log(`${i} ${savePath}`)
      if (!fs.existsSync(savePath)) {
        const folderPath = savePath.substring(0, savePath.lastIndexOf("/")+1)
        fs.mkdirSync(folderPath, { recursive: true, })

        promises.push(axios.get(cover, {
          responseType: 'stream'
        }).then(response => {
          response.data.pipe(fs.createWriteStream(savePath));
        }))
      }
    }
    await Promise.all(promises)
  }
  return data;
}

module.exports.getAnimes = async () => {
  const data = await getData(1);
  fs.writeFileSync(path.join(rootPath, "../public/bilibili-anime.json"), JSON.stringify(data));
}

module.exports.getEpisode = async () => {
  const data = await getData(5);
  fs.writeFileSync(path.join(rootPath, "../public/bilibili-episode.json"), JSON.stringify(data));
}
