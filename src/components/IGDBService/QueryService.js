var axios = require('axios')

exports.query = function(req, res) {
    axios({
        method: 'post',
        url: "http://localhost:3000/" + req.query.url,
        data: req.query.query
        })
        .then(response => res.json(response.data))
        .catch(err => res.send(err));
}