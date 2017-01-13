var cache = require('../../lib/cache.lib');
var _ = require('lodash');
var db = require("../../lib/db.lib.js");
var async = require('async');
var filter = require("../../lib/filter.lib");
var headNav = require("../models/conNav.model");
//缓存公共头部菜单,仅显示1级菜单
module.exports = function(callback) {
	var headNav = cache.get('headNav');
	if(headNav) {
		callback(null, _.cloneDeep(headNav));
	} else {
		async.parallel([
			function(done) {
				cNav(function(err,data){
					if(!err){
						done(null,data);
					}
				})
			},
		], function(error, result) {
			cache.set('headNav', result[0], 1000 * 60 * 60 * 2);
			callback(error, result[0]);
		});
	}
};