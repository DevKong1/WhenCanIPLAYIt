// Listen on a specific host via the HOST environment variable
var host = process.env.HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PORT || 3000;

var cors_proxy = require('cors-anywhere');

exports.startProxy = function() {
    cors_proxy.createServer({
        originWhitelist: [], // Allow all origins
        setHeaders: {"user-key": "8b52d6947ece24b07257a743ea324d89"},
    }).listen(port, host, function() {
        console.log('Running CORS Anywhere on ' + host + ':' + port);
    });
}