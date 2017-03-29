//var newsModel = require("../models/api_news.model");
//var filter = require("../../lib/filter.lib");

//exports.add = function(req, res, callback) {
//	var news = {};
//	news.classFirstId = req.body.classFirstId,
//		news.classChildId = req.body.classChildId,
//		news.newsUrl = req.body.newsUrl,
//		news.subTitle = req.body.subTitle,
//		news.title = req.body.title,
//		news.subKeywords = req.body.subKeywords,
//		news.keywords = req.body.keywords,
//		news.source = req.body.source,
//		news.description = req.body.description,
//		news.author = req.body.author,
//		news.time = req.body.time,
//		news.nContent = req.body.nContent.filterColon();
//	newsModel.add(news, function(err, rows) {
//		if(err) {
//			err.type = 'database';
//			return callback(err)
//		}
//		callback(null, rows)
//	});
//}
//
//exports.put = function(req, res, callback) {
//		var news = {};
//		news.id = req.body.newsId,
//		news.classFirstId = req.body.classFirstId,
//		news.classChildId = req.body.classChildId,
//		news.newsUrl = req.body.newsUrl,
//		news.subTitle = req.body.subTitle,
//		news.title = req.body.title,
//		news.subKeywords = req.body.subKeywords,
//		news.keywords = req.body.keywords,
//		news.source = req.body.source,
//		news.description = req.body.description,
//		news.author = req.body.author,
//		news.time = req.body.time,
//		news.nContent = req.body.nContent.filterColon();
//		newsModel.put(news, function(err, rows) {
//		if(err) {
//			err.type = 'database';
//			return callback(err)
//		}
//		callback(null, rows)
//	});
//}