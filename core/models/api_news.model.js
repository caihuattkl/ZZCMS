var db = require("../../lib/db.lib.js");
var logger = require('../../lib/logger.lib');
//新增新闻
exports.add=function(options,callback) {
	var sql = 'insert into news(id,classFirstId,classChildId,newsUrl,subTitle,title,subKeywords,keywords,source,description,author,time,nContent)values("id","' + options.classFirstId + '","' + options.classChildId + '","' + options.newsUrl + '","' + options.subTitle + '","' + options.title + '","' + options.subKeywords + '","' + options.keywords + '","' + options.source + '","' + options.description + '","' + options.author + '","' + options.time + '","' + options.nContent + '")'
	db.query(sql, function(err, rows) {
		if(err) {
			err.type = 'database';
			logger.database().error(__filename, err);
			return callback(err);
		}
		setAddNewsUrl(rows.insertId,callback)
	})
}
//新增新闻后,完善url
function setAddNewsUrl(id,callback) {
	var sql='update news set newsUrl = replace(newsUrl,".html","'+id+'.html") where id ="'+id+'"';
	db.query(sql, function(err, rows) {
		if(err) {
			err.type = 'database';
			logger.database().error(__filename, err);
			return callback(err);
		}
		callback(null, rows)
	})
}


//删除新闻
exports.del=function(id,callback) {
	var sql="delete from news where id=" + id
	db.query(sql, function(err, rows) {
		if(err) {
			err.type="database";
			logger.database().error(__filename, err);
			return callback(err);
		}
		callback(null, rows)
	})
}

//更新新闻
exports.put=function(opt,callback) {
	var sql = 'UPDATE news SET classFirstId="' + opt.classFirstId + '",classChildId="' + opt.classChildId + '",newsUrl="' + opt.newsUrl + '",subTitle="' + opt.subTitle + '",title="' + opt.title + 
	'",subKeywords="' + opt.subKeywords + '",keywords="' + opt.keywords + '",source="' + opt.source + '",description="' + opt.description + 
	'",author="' + opt.author + '",time="' + opt.time + '",nContent="' + opt.nContent + '" WHERE id =' + opt.newsId
	db.query(sql,function(err, rows) {
		if(err) {
			err.type="database";
			logger.database().error(__filename, err);
			return callback(err);
		}
		callback(null, rows)
	})
}

//所有新闻
exports.newsList=function(opts,callback) {
	var sql = 'SELECT * FROM news where classChildId="' + opts.newsClassId+'" ORDER BY time DESC'
	db.query(sql, function(err, rows) {
		if(err) {
			err.type="database";
			logger.database().error(__filename, err);
			return callback(err);
		}
		callback(null, rows)
	})
}

//获取指定新闻
exports.newsDetail=function(opts,callback) {
	var sql = 'SELECT * FROM news where id=' + opts.id
	db.query(sql, function(err, rows) {
		if(err) {
			err.type="database";
			logger.database().error(__filename, err);
			return callback(err);
		}
		callback(null, rows)
	})
}

//新增新闻
exports.infoRepertoryAdd=function(options,callback) {
	var sql = 'insert into inforepertory(id,classFirstId,classChildId,newsUrl,subTitle,title,subKeywords,keywords,source,description,author,time,nContent)values("id","' + options.classFirstId + '","' + options.classChildId + '","' + options.newsUrl + '","' + options.subTitle + '","' + options.title + '","' + options.subKeywords + '","' + options.keywords + '","' + options.source + '","' + options.description + '","' + options.author + '","' + options.time + '","' + options.nContent + '")'
	db.query(sql, function(err, rows) {
		if(err) {
			err.type="database";
			logger.database().error(__filename, err);
			return callback(err);
		}
		setAddNewsUrl(rows.insertId,callback)
	})
}

//获取所有信息库新闻
exports.infoRepertoryList=function(opts,callback) {
	var sql ='SELECT * FROM infoRepertory ORDER BY time DESC'
	db.query(sql, function(err, rows) {
		if(err) {
			err.type="database";
			logger.database().error(__filename, err);
			return callback(err);
		}
		callback(null,rows)
	})
}

//获取指定id信息库新闻
exports.infoRepertoryDetail=function(opts,callback) {
//	var sql ='SELECT * FROM infoRepertory where classChildId="' + opts.newsClassId+'" ORDER BY time DESC'
	var sql ='SELECT * FROM infoRepertory where id="' + opts.id+'"'
	db.query(sql, function(err, rows) {
		if(err) {
			err.type="database";
			logger.database().error(__filename, err);
			return callback(err);
		}
		callback(null,rows)
	})
}