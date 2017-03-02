var cache = require('../../lib/cache.lib');
var async = require('async');
var _ = require('lodash');
var directorys = require('../models/directorys.model');

//缓存顶级和子目录信息
var cacheDirectory = function(callback) {
//	var _url = req.url.substr(1).split('/'),dirs;
	var cacheDir = cache.get('cacheDirs');
	if(cacheDir) {
//		for(var i=0;i<cacheDir.length;i++){
//			if(cacheDir[i].directoryName==_url[0]) {
//					dirs = cacheDir[i].directoryName;
//				}
//		}
		callback(null,_.cloneDeep(cacheDir))
	} else {
		async.parallel([
			function(callback) {
				directorys(callback)
			}
		], function(error, result) {
			if(error) {
				return res.status(500).end();
			}
//			result[0].forEach(function(val, index) {
//				if(val.directoryName==_url[0]) {
//					dirs = val.directoryName;
//				}
//			})
			callback(null,result[0])
			cache.set('cacheDirs', result[0], 1000 * 60 * 60 * 24);
		});
	}
};

module.exports = cacheDirectory;