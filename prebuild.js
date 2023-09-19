const getAnime1Data = require('./script/get-anime1-data');
const getIqiyiVideoImage = require('./script/get-iqiyi-data');
const { getAnimes, getEpisode } = require('./script/get-bilibili-data');
const poxiaoVideo = require('./script/get-poxiao-data');

getAnime1Data();
getIqiyiVideoImage();
getAnimes();
getEpisode();
poxiaoVideo.getAnimes();
poxiaoVideo.getTeleplays();
poxiaoVideo.getMovies();
