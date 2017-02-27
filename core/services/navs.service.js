var cache = require('../../lib/cache.lib');
var _ = require('lodash');
var async = require('async');
var filter = require("../../lib/filter.lib");
var navs = require("../models/navs.model");

//缓存公共头部菜单,仅显示1级菜单
function navsCache(callback) {
	var headNavCache = cache.get('headNavCache');
	if(headNavCache) {
		callback(null, _.cloneDeep(headNavCache));
	} else {
		async.parallel([
			function(done) {
				navs.nav(function(data) {
					done(null, data);
				})
			},
		], function(error, result) {
			cache.set('headNavCache', result[0], 1000 * 60 * 60 * 2);
			callback(error, result[0]);
		});
	}
};

module.exports = navsCache;