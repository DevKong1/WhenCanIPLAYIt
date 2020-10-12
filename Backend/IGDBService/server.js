var cors_proxy = require('cors-anywhere');

// Listen on a specific host via the HOST environment variable
var host = process.env.PROXY_HOST || '0.0.0.0';
// Listen on a specific port via the PORT environment variable
var port = process.env.PROXY_PORT || 3000;

exports.startProxy = async function() {
    await cors_proxy.createServer({
        originWhitelist: [], // Allow all origins
        setHeaders: {"user-key": process.env.IGDB_USER_KEY},
    }).listen(port, host, function() {
        console.log('Running CORS Anywhere on ' + host + ':' + port);
    });
}