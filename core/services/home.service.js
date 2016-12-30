var cache = require('../../lib/cache.lib');
var async = require('async');
var _ = require('lodash');
var homeModel = require('../models/home.model');
var db = require("../../lib/db.lib.js");
var filter = require("../../lib/filter.lib");
//缓存顶级和子目录信息
exports.cacheDirectory = function(callback) {
	var cacheDirectory = cache.get('cacheDirectory');
	if(cacheDirectory) {
		callback(null, _.cloneDeep(cacheDirectory));
	} else {
		async.parallel({
			fristDirectory: function(done) {
				var sql = 'select directoryName from newsclass where firstId ="0"';
				db.query(sql, function(err, rows1) {
					if(!err) {
						done(null, rows1);
					}
				})
			},
			childDirectory: function(done) {
				var sql = 'select directoryName from newsclass where firstId <>"0"';
				db.query(sql, function(err, rows2) {
					if(!err) {
						done(null, rows2);
					}
				})
			}
		}, function(error, result) {
			cache.set('cacheDirectory', result, 1000 * 60 * 60 * 24);
			callback(error, result);
		});
	}
};

//返回渲染页面数据
exports.articlesRender = function(req, res, next) {
	var sql = 'SELECT title,description,keywords,subTitle,subKeywords,nContent,time from news where uuid = "' + req.originalUrl.match(/[\d]{13}/) + '" or newsUrl = "' + req.originalUrl.substr(1) + '"' +
		'UNION ALL SELECT null,null,b.id,b.subTitle,b.directoryName,null,null FROM news a,newsclass b where a.classFirstId=b.id and a.uuid ="' + req.originalUrl.match(/[\d]{13}/) + '" and a.newsUrl ="' + req.originalUrl.substr(1) + '"' +
		'UNION ALL SELECT null,null,b.id,b.subTitle,b.directoryName,null,null FROM news a,newsclass b where a.classChildId=b.id and a.uuid ="' + req.originalUrl.match(/[\d]{13}/) + '" and a.newsUrl ="' + req.originalUrl.substr(1) + '"'
	db.query(sql, function(err, rows) {
		if(!err) {
			res.render('template/article_article', {
				classFirstId: rows[1].keywords,
				classChildId: rows[2].keywords,
				classFirstText: rows[1].subTitle,
				classFirstDirectoryName: rows[1].subKeywords,
				classChildText: rows[2].subTitle,
				classChildDirectoryName: rows[2].subKeywords,
				subTitle: rows[0].subTitle,
				nContent: rows[0].nContent,
				time: filter.formatDate(rows[0].time, 'yyyy-MM-dd HH:mm:ss'),
			});
		}
	})
};


//返回渲染页面数据
exports.classRender = function(req, res, next) {
	var sql="SELECT * from newsclass where id='"+req.params.id+"'";
	db.query(sql, function(err, rows) {
		if(!err) {
			res.render('template/article_class',{
				title:rows[0].title
			});
		}
	})
};

//返回渲染页面数据
exports.channelRender = function(req, res, next) {
	var sql="SELECT * from newsclass where id='"+req.params.id+"'";
	db.query(sql, function(err, rows) {
		if(!err) {
			res.render('template/article_channel',{
				title:rows[0].title
			});
		}
	})
};