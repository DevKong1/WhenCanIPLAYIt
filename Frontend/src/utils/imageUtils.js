export function getImg(url) {
    //ONLY BECAUSE IGDBSERVICE IS NOT A REAL WEB SERVICE ELSE IT WOULD JUST BE AN URL
    let img = "";
    try {
      img = require("../../../Backend/IGDBService/public/" + url);
      return img;
    } catch (e) {
      img = 'default_cover.jpg';
      return img;
    }
};

