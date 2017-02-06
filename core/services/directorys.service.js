var cache = require('../../lib/cache.lib');
var async = require('async');
var _ = require('lodash');
var directorys = require('../models/directorys.model');

//缓存顶级和子目录信息
var cacheDirectory = function(req, res, callback) {
	var cacheDirectory = cache.get('cacheDirectory');
	if(cacheDirectory) {
		var oUrl = req.originalUrl,dirs;
		cacheDirectory.fristDirectory.forEach(function(val, index) {
			if(new RegExp(val.directoryName).test(oUrl.split("/")[1])) {
				dirs = val.directoryName;
			}
		})
		callback(null, _.cloneDeep(dirs));
	} else {
		async.parallel({
			fristDirectory: function(done) {
				directorys.fristDirectory(function(fristDirectoryData) {
					done(null, fristDirectoryData);
				})

			},
			childDirectory: function(done) {
				directorys.childDirectory(function(childDirectoryData) {
					done(null, childDirectoryData);
				})
			}
		}, function(error, result) {
			cache.set('cacheDirectory', result, 1000 * 60 * 60 * 24);
			var oUrl = req.originalUrl,dirs;
			if(!error) {
				result.fristDirectory.forEach(function(val, index) {
					if(new RegExp(val.directoryName).test(oUrl.split("/")[1])) {
						dirs = val.directoryName;
					}
				})
				callback(error, dirs);
			}
		});
	}
};

module.exports = cacheDirectory;