/*
 	2017.2.5		本文件由于不需要缓存,所以没有使用.可以删除
 * */
var cache = require('../../lib/cache.lib');
var async = require('async');
var _ = require('lodash');
var channel = require('../models/channel.model');
var db = require("../../lib/db.lib.js");
var filter = require("../../lib/filter.lib");




//缓存频道页面数据
var cacheChannel = function(req,res,callback) {
	//不使用缓存
	
//	var cacheChannel = cache.get('cacheChannel');
	
//	if(cacheChannel) {
//		callback(null, _.cloneDeep(cacheChannel));
//	} else {
		async.parallel({
			channelNav: function(done) {
				channel.channelNav(req,res,function(data){
					done(null,data);
				})
			},
			channelNews: function(done) {
				channel.channelNews(req,res,function(data){
					done(null,data);
				})
			},
			classAll:function(done){
				channel.classAll(req,res,function(data){
					done(null,data);
				})
			},
			allNews:function(done){
				channel.classNews(req,res,function(data){
					done(null,data);
				})
			},
			topline:function(done){
				channel.topline(req,res,function(data){
					done(null,data);
				})
			}
		}, function(error, result) {
//			cache.set('cacheChannel', result, 1000 * 60 * 60 * 2);
			callback(error, result);
		});
//	}
};

module.exports=cacheChannel;