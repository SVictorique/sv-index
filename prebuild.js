const getAnime1Data = require('./script/get-anime1-data');
const getIqiyiData = require('./script/get-iqiyi-data');
const getBilibiliData = require('./script/get-bilibili-data');
const getPoxiaoData = require('./script/get-poxiao-data');

getAnime1Data.getAnimes();
getIqiyiData.getImages();
getBilibiliData.getAnimes();
getBilibiliData.getTeleplays();
getPoxiaoData.getAnimes();
getPoxiaoData.getTeleplays();
getPoxiaoData.getMovies();
