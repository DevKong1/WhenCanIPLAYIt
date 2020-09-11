module.exports = function(app) {
	var queryService = require('./IGDBService/QueryService');

	app.route('/api/queryservice')
		.get(queryService.query)
};
