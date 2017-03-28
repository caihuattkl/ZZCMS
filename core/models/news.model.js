let db = require("../../lib/db.lib.js");
let logger = require('../../lib/logger.lib');

exports.classNews = function(opt, callback) {
	let sql ='select (SELECT COUNT(*) FROM news where classChildId ="' + opt.classId+ '") as total,n.* from news n where classChildId="' + opt.classId+ '" ORDER BY time DESC limit '+opt.star+','+opt.end;
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || "classNews数据为空，news.model文件");
			if(!rows.length) return callback(null,[]);
			return callback(err);
		}
		callback(null, rows)
	})
};

//获取频道最新更新所有新闻(实时更新)
exports.channelNewestNews = function(opt, callback) {
	let sql = 'select * from news where classChildId in(select id from news_class where classFirstId="' + opt.channelId + '") ORDER BY time DESC limit 0,11'
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || "channelNewestNews数据为空，news.model文件");
			if(!rows.length) return callback(null,[]);
			return callback(err);
		}
		callback(null, rows)
	})
}

//获取频道title信息和菜单名称
exports.channelInfo = function(req, res, callback) {
	let sql = "SELECT * from news_class where id='" + req.params.id + "'" + "UNION ALL SELECT * from news_class where firstId='" + req.params.id + "'"
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || "channelInfo数据为空，news.model文件");
			if(!rows.length) return callback(null,[]);
			return callback(err);
		}
		callback(null, rows)
	})
}


//获取频道所属所有栏目的所有新闻
exports.classBlockNews = function(opt, callback) {
	let sql = "SELECT classFirstId,classChildId,subTitle,newsUrl,time from news where classChildId in (SELECT id from news_class WHERE firstId IN (select id from news_class where id='" + opt.channelId + "')) ORDER BY time DESC limit 0,10"
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || "classBlockNews数据为空，news.model文件");
			if(!rows.length) return callback(null,[]);
			return callback(err);
		}
		callback(null, rows)
	})
}

//获取频道头条
exports.topline = function(opt, callback) {
	let sql = 'select newsUrl,subTitle,coverImg from news WHERE id in(select newsId from topline WHERE newsNumber="' + opt.channelId + '")'
//	db.query(sql, function(err, rows) {
//		if(err || !rows.length) {
//			logger.database().error(__filename, err || "topline数据为空，news.model文件");
//			if(!rows.length) return callback(null,[]);
//			return callback(err);
//		}
		callback(null, [])
//	})
}

//新闻内容
exports.articles = function(req, res, callback) {
	let url = req.originalUrl.substr(1);
	if(req.params.id && req.params.id.split('-').length !== 1) {url = req.originalUrl.substr(1).split('-')[0] + '.html';}
	let sql = ['SELECT * from news where newsUrl ="' + url + '"','UPDATE news SET pv = pv+1 WHERE newsUrl = "' + url + '"'];
	
	db.query(sql[0], function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || '文章获取失败,请检查');
			return callback(err || '文章获取失败,请检查');
		}
		callback(null, rows[0])
	})
	
};

//新增新闻
exports.add = function(req,res,callback) {
	let sql='select * from news_class where id="'+req.query.classFirstId+'"';
		db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || "添加新闻失败请检查news.model文件");
			if(!rows.length) return callback(null,[]);
			return callback(err);
		}
		callback(null, rows)
	})
}