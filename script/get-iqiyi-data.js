const axios = require("axios");
const fs = require("fs");
const path = require("path")
const url = 'https://mesh.if.iqiyi.com/portal/videolib/pcw/data?ret_num=999999&page_id=1&channel_id=2&mode=4';
module.exports.getImages = async () => {
  const rootPath = path.resolve(__dirname);

  const res = await axios.get(url)
  for (const video of res.data.data) {
    const coverUrl = video.image_url_normal;
    const savePath = path.join(rootPath, '../public/iqiyi/' + coverUrl.substring(coverUrl.indexOf("/image/")));

    if (!fs.existsSync(savePath)) {
      const folderPath = savePath.substring(0, savePath.lastIndexOf("/")+1)
      console.log(coverUrl)
      fs.mkdirSync(folderPath, { recursive: true, })

      await axios.get(coverUrl, {
        responseType: 'stream'
      }).then(response => {
        response.data.pipe(fs.createWriteStream(savePath));
      })
    }
  }
}
