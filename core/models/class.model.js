const db = require("../../lib/db.lib.js");

exports.classNewsList  =  function(req,res,callback) {
	var sql="SELECT subTitle,nContent,newsUrl,time from news where classChildId='"+req.params.id+"' ORDER BY time DESC";
	db.query(sql, function(err, rows) {
		callback(err, rows);
	})
};

//菜单
exports.classNav  =  function(req,res,callback) {
	var sql="select id,subTitle,directoryName from news_class WHERE firstId in(select firstId from news_class WHERE id='"+req.params.id+"')";
	db.query(sql, function(err, rows) {
		callback(err, rows);
	})
};

exports.classInfo  =  function(req,res,callback) {
	var sql="select id,directoryName,subTitle,keywords,description from news_class WHERE id = (select firstId from news_class WHERE id='"+req.params.id+"')"+
	"UNION ALL select id,directoryName,subTitle,keywords,description from news_class WHERE id='"+req.params.id+"'";
	db.query(sql, function(err, rows) {
		callback(err, rows);
	})
};