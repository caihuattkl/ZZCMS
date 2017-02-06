const db = require("../../lib/db.lib.js");

//获取频道最新更新所有新闻(实时更新)
exports.channelNews = function(req,res,callback) {
		db.query('select * from news where classChildId in(select id from newsclass where classFirstId="'+req.params.id+'") ORDER BY time DESC limit 0,11', function(err, rows) {
			if(!err) {
				callback(rows)
			}
		})
}
//获取频道title信息和菜单名称
exports.channelNav = function(req,res,callback) {
	var sql ="SELECT * from newsclass where id='"+req.params.id+"'"+"UNION ALL SELECT * from newsclass where firstId='"+req.params.id+"'"
		db.query(sql, function(err, rows) {
			if(!err) {
				callback(rows)
			}
		})
}

//获取频道下所有栏目名称
exports.classAll = function(req,res,callback) {
	var sql ="SELECT id,firstId,subTitle,directoryName from newsclass WHERE firstId IN (select id from newsclass where id='"+req.params.id+"')"
		db.query(sql, function(err, rows) {
			if(!err) {
				callback(rows)
			}
		})
}

//获取频道所属所有栏目的所有新闻
exports.classNews = function(req,res,callback) {
	var sql ="SELECT classFirstId,classChildId,subTitle,newsUrl,time from news where classChildId in (SELECT id from newsclass WHERE firstId IN (select id from newsclass where id='"+req.params.id+"')) ORDER BY time DESC limit 0,10"
		db.query(sql, function(err, rows) {
			if(!err) {
				callback(rows)
			}
		})
}

//获取频道头条
exports.topline = function(req,res,callback) {
	var sql ='select newsUrl,subTitle,coverImg from news WHERE id in(select newsId from topline WHERE newsNumber="'+req.params.id+'")'
		db.query(sql, function(err, rows) {
			if(!err) {
				callback(rows)
			}
		})
}