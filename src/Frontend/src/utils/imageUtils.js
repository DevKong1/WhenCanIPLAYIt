export function getImg(url, fallback) {
    //ONLY BECAUSE IGDBSERVICE IS NOT A REAL WEB SERVICE ELSE IT WOULD JUST BE AN URL
    let img = "";
    try {
      img = require("../../../Backend/IGDBService/public/" + url);
      return img;
    } catch (e) {
      return fallback;
    }
};

