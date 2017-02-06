const db = require("../../lib/db.lib.js"),
	async = require('async'),
	logger = require('morgan'),
	directorySev = require("../services/directorys.service"),
	classMod = require("../models/class.model"),
	navsCache = require("../services/navs.service"); //公共菜单数据

exports.class = function(req, res, next) {
	directorySev(req, res, function(err, dir) {
		if(!err && dir) {
			async.parallel({
				classNewsList: function(done) {
					classMod.classNewsList(req, res, function(err1, News) {
						done(null, News);
					})
				},
				classNav: function(done) {
					classMod.classNav(req, res, function(err2, nav) {
						done(null, nav);
					})
				},
				currentClassInfo: function(done) {
					classMod.classInfo(req, res, function(err2, nav) {
						done(null, nav);
					})
				},
				navsCache: function(callback) {
					navsCache(function(err, data) {
						callback(null, data);
					})
				}
			}, function(err1, data) {
				
				if(err1) return res.status(500).end();

				res.render('template/article_class', {
					crumbs: data.currentClassInfo,
					subTitle: data.currentClassInfo[1].subTitle,
					keywords: data.currentClassInfo[1].keywords,
					description: data.currentClassInfo[1].description,
					classNewsList: data.classNewsList,
					classNav: data.classNav,
					conNav: data.navsCache
				})

			});

		} else {
			return res.status(404).send('Not Found');
		}
	})
};