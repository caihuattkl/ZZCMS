var cache = require('../../lib/cache.lib');
var async = require('async');
var _ = require('lodash');
var adsMod = require('../models/ads.model');

//所有广告缓存
exports.ads = function(callback) {
	var cacheAds = cache.get('cacheAds');
	if(cacheAds) {
		callback(null,_.cloneDeep(cacheAds))
	} else {
		async.parallel([
			function(callback) {
				adsMod.ads(callback)
			}
		], function(error, result) {
			if(error) return res.status(500).end('500 - Server Error');
			callback(null,result[0])
			cache.set('cacheAds', result[0], 1000 * 60 * 20);
		});
	}
};

