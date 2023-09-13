const getAnime1Data = require('./script/get-anime1-data');
const getIqiyiVideoImage = require('./script/get-iqiyi-video-image');
const { getAnimes, getEpisode } = require('./script/get-bilibili-video');

getAnime1Data();
getIqiyiVideoImage();
getAnimes();
getEpisode();


