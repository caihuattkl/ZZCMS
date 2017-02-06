const db = require("../../lib/db.lib.js"),
	async = require('async'),
	logger = require('morgan'),
	directorySev = require("../services/directorys.service"),
	channelSev = require("../services/channel.service"),
	navsCache = require("../services/navs.service"), //公共菜单数据
	channel = require('../models/channel.model');
	
	
exports.channel = function(req, res, next) {
	directorySev(req, res, function(err, dir) {
		//根据目录匹配路由
		if(!err && dir) {
			
			async.parallel({
				channelNav: function(callback) {
					channel.channelNav(req, res, function(data) {
						callback(null, data);
					})
				},
				channelNews: function(callback) {
					channel.channelNews(req, res, function(data) {
						callback(null, data);
					})
				},
				classAll: function(callback) {
					channel.classAll(req, res, function(data) {
						callback(null, data);
					})
				},
				allNews: function(callback) {
					channel.classNews(req, res, function(data) {
						callback(null, data);
					})
				},
				topline: function(callback) {
					channel.topline(req, res, function(data) {
						callback(null, data);
					})
				},
				navsCache:function(callback){
					navsCache(function(err,data) {
						callback(null, data);
					})
				}
			}, function(error, result) {
				if (err) return res.status(500).end();
				var childClass = [];
						for(var i = 1; i < result.channelNav.length; i++) {
							childClass.push(result.channelNav[i])
						}
				var channelObj = {
							title: result.channelNav[0].title,
							keywords: result.channelNav[0].keywords,
							description: result.channelNav[0].description,
							directoryName: result.channelNav[0].directoryName,
							subTitle: result.channelNav[0].subTitle,
							id: result.channelNav[0].id,
							childClass: childClass,
							constantlyNews: result.channelNews,
							classAll: result.classAll,
							allNews: result.allNews,
							conNav: result.navsCache,
							toplines: result.topline
						}
				res.render('template/article_channel', channelObj)
			});
		} else {
			return res.status(404).send('Not Found');
		}
	})
}