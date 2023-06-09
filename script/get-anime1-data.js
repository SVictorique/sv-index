const fs = require('fs');

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

    fs.writeFileSync('../public/anime1-data.json', JSON.stringify(animeList))
  })
