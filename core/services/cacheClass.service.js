var cache = require('../../lib/cache.lib');
var async = require('async');
var _ = require('lodash');
var cacheClass = require('../models/cacheClass.model');

//新闻分类缓存
exports.cacheNewsClass = function(callback) {
	var cacheNewsClass = cache.get('cacheNewsClass');
	if(cacheNewsClass) {
		callback(null,_.cloneDeep(cacheNewsClass))
	} else {
		async.parallel([
			function(callback) {
				cacheClass.cacheNewsClass(callback)
			}
		], function(error, result) {
			if(error) {
				return res.status(500).end('500 - Server Error');
			}
			callback(null,result[0])
			cache.set('cacheNewsClass', result[0], 1000 * 60 * 60 * 24);
		});
	}
};
//报告分类缓存
exports.cacheReportsClass = function(callback) {
	var cacheReportsClass = cache.get('cacheReportsClass');
	if(cacheReportsClass) {
		callback(null,_.cloneDeep(cacheReportsClass))
	} else {
		async.parallel([
			function(callback) {
				cacheClass.cacheReportsClass(callback)
			}
		], function(error, result) {
			if(error) {
				return res.status(500).end('500 - Server Error')
			}
			callback(null,result[0])
			cache.set('cacheReportsClass', result[0], 1000 * 60 * 60 * 24);
		});
	}
};

