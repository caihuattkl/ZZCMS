const db = require("../../lib/db.lib.js"),
	async = require('async'),
	logger = require('morgan'),
	directorySev = require("../services/directorys.service"),
	channelSev = require("../services/channel.service"),
	_conNav = require("../services/conNav.service"); //公共菜单数据

exports.channel = function(req, res, next) {
	directorySev(req, res, function(err, dir) {
		//根据目录匹配路由
		
		if(!err && dir) {
			return channelSev(req, res, function(err1, data) {
				_conNav(function(err2, data2) {
					if(!err1 && data.channelNews.length != 0 && !err2 && data2.length != 0) {
						var childClass = [];
						for(var i = 1; i < data.channelNav.length; i++) {
							childClass.push(data.channelNav[i])
						}
						var channelObj = {
							title: data.channelNav[0].title,
							keywords: data.channelNav[0].keywords,
							description: data.channelNav[0].description,
							directoryName: data.channelNav[0].directoryName,
							subTitle: data.channelNav[0].subTitle,
							id: data.channelNav[0].id,
							childClass: childClass,
							constantlyNews: data.channelNews,
							classAll: data.classAll,
							allNews: data.allNews,
							conNav: data2
						}
						res.render('template/article_channel', channelObj)
					} else {
						return res.status(404).send('Not Found');
					}
				})
			});

		} else {
			return res.status(404).send('Not Found');
		}
	})
}