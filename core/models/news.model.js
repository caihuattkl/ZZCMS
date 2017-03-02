var db = require("../../lib/db.lib.js");
var logger = require('../../lib/logger.lib');

exports.classNews = function(req, res, callback) {
	var sql = "SELECT subTitle,nContent,newsUrl,time from news where classChildId='" + req.params.id.split('-')[0] + "' ORDER BY time DESC";
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'classNews the data is empty');
			return callback(err || 'classNews the data is empty');
		}
		callback(null, rows)
	})
};

//获取频道最新更新所有新闻(实时更新)
exports.channelNewestNews = function(req, res, callback) {
	var sql = 'select * from news where classChildId in(select id from news_class where classFirstId="' + req.params.id + '") ORDER BY time DESC limit 0,11'
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'channelNews the data is empty');
			return callback(err || 'channelNews the data is empty');
		}
		callback(null, rows)
	})
}

//获取频道title信息和菜单名称
exports.channelInfo = function(req, res, callback) {
	var sql = "SELECT * from news_class where id='" + req.params.id + "'" + "UNION ALL SELECT * from news_class where firstId='" + req.params.id + "'"
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'channelNav the data is empty');
			return callback(err || 'channelNav the data is empty');
		}
		callback(null, rows)
	})
}


//获取频道所属所有栏目的所有新闻
exports.classBlockNews = function(req, res, callback) {
	var sql = "SELECT classFirstId,classChildId,subTitle,newsUrl,time from news where classChildId in (SELECT id from news_class WHERE firstId IN (select id from news_class where id='" + req.params.id + "')) ORDER BY time DESC limit 0,10"
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'classNews the data is empty');
			return callback(err || 'classNews the data is empty');
		}
		callback(null, rows)
	})
}

//获取频道头条
exports.topline = function(req, res, callback) {
	var sql = 'select newsUrl,subTitle,coverImg from news WHERE id in(select newsId from topline WHERE newsNumber="' + req.params.id + '")'
	db.query(sql, function(err, rows) {
		if(!rows.length) rows='empty';
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'topline the data is empty');
			return callback(err || 'topline the data is empty');
		}
		callback(null, rows)
	})
}

//新闻内容
exports.articles = function(req, res, callback) {
	var url = req.originalUrl.substr(1);
	if(req.params.id && req.params.id.split('-').length !== 1) {
		url = req.originalUrl.substr(1).split('-')[0] + '.html';
	}
	var sql = ['SELECT * from news where newsUrl ="' + url + '"',
		'UPDATE news SET pv = pv+1 WHERE newsUrl = "' + url + '"'
	];
	
	db.query(sql[0], function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'articles the data is empty');
			return callback(err || 'articles the data is empty');
		}
		callback(null, rows[0])
	})
	
};