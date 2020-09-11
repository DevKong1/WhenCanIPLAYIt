var axios = require('axios')

exports.query = function(req, res) {
    axios({
        method: 'post',
        url: "http://localhost:3000/" + "https://api-v3.igdb.com/release_dates",
        data: "fields *; where date >= 1599849743; limit 50; sort date asc;"
        })
        .then(response => res.json(response.data))
        .catch(err => res.send(err));
}