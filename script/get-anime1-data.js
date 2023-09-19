const fs = require('fs');
const path = require("path");
const {root} = require("../.eslintrc");

module.exports.getAnimes = async () => {
  fetch(`https://d1zquzjgwo9yb.cloudfront.net/?_${Date.now()}`)
    .then(r => r.json())
    .then(r => {
      const animeList = []
      for (const item of r) {
        animeList.push({
          id: item[0],
          name: item[1],
          eps: item[2],
          year: item[3],
          season: item[4],
          group: item[5],
        })
      }

      const rootPath = path.resolve(__dirname);
      const folderPath = path.join(rootPath, '../public/anime1/');
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, {
          recursive: true,
        })
      }
      fs.writeFileSync(path.join(folderPath, 'anime1-anime.json'), JSON.stringify(animeList))
    })
}
