const db = require("../../lib/db.lib.js"),
	async = require('async'),
	logger = require('morgan'),
	directorySev = require("../services/directorys.service"),
	homeMod = require("../models/home.model"),
	filter = require("../../lib/filter.lib"),
	_conNav = require("../services/conNav.service"); //公共菜单数据;
	
exports.articles = function(req, res, next) {
	directorySev(req, res, function(err, dir) {
		if(!err && dir) {
			_conNav(function(err2, data2) {
				return homeMod.articles(req, res, function(sqlErr, rows) {
					if(!sqlErr && rows.length != 0) {
						res.render('template/article_article', {
							classFirstId: rows[1].keywords,
							classChildId: rows[2].keywords,
							classFirstText: rows[1].subTitle,
							classFirstDirectoryName: rows[1].subKeywords,
							classChildText: rows[2].subTitle,
							classChildDirectoryName: rows[2].subKeywords,
							subTitle: rows[0].subTitle,
							nContent: rows[0].nContent,
							title:rows[0].title,
							keywords:rows[0].keywords,
							description:rows[0].description,
							time: filter.formatDate(rows[0].time, 'yyyy-MM-dd HH:mm:ss'),
							conNav:data2
						});
					} else {
						return res.status(404).send('Not Found');
					}
				})
			})
		}else{
			return res.status(404).send('Not Found');
		}
	})
};