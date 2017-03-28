var logger = require('./logger.lib');

//判断频道页下栏目页
exports._class = function(req, res, directorys, callback) {
	var reqUrl = req.url.substr(1).split('/'),
		errInfo = 'ERROR NOT FOUND';
	for(var i = 0; i < directorys.length; i++) {
		if(directorys[i].directoryName == reqUrl[0]) {
			for(var n = 0; n < directorys[i].child.length; n++) {
				if(directorys[i].child[n].directoryName == reqUrl[1]) {
					console.log(directorys[i].child[n].id)
					return callback(null, directorys[i].child[n].id)
				}
			}
		}

	}

	logger.system().error(__filename, errInfo);
	res.status(404).end('404 - ' + errInfo);
	callback(errInfo);
}

//判断频道页
exports.channel = function(req, res, cacheNewsClass, callback) {
	var reqUrl = req.url.substr(1).split('/'),
		errInfo = 'ERROR NOT FOUND';
	for(var i = 0; i < cacheNewsClass.length; i++) {
		if(cacheNewsClass[i].directoryName == reqUrl[0]) {
			return callback(null, true)
		}
	}
	logger.system().error(__filename, errInfo);
	res.status(404).end('404 - ' + errInfo);
	callback(errInfo);
}

//新闻处理
exports.articles = function(req, res, directorys, callback){
	var reqUrl = req.url.substr(1).split('/'),errInfo = 'ERROR NOT FOUND';
	for(var i = 0; i < directorys.length; i++) {
		if(directorys[i].directoryName == reqUrl[0]&&new RegExp(/[0-9]+/).test(reqUrl[1])) {
			return callback(null, true)
		}
	}

	logger.system().error(__filename, errInfo);
	res.status(404).end('404 - ' + errInfo);
	callback(errInfo);
}