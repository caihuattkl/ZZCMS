var db = require("../../lib/db.lib.js");

//新增新闻
exports.add=function(options,callback) {
	var sql = 'insert into news(id,classFirstId,classChildId,newsUrl,subTitle,title,subKeywords,keywords,source,description,author,time,nContent)values("id","' + options.classFirstId + '","' + options.classChildId + '","' + options.newsUrl + '","' + options.subTitle + '","' + options.title + '","' + options.subKeywords + '","' + options.keywords + '","' + options.source + '","' + options.description + '","' + options.author + '","' + options.time + '","' + options.nContent + '")'
	db.query(sql, function(err, rows) {
		if(err) {
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
		callback(err, rows)
	});
}

//更新新闻
exports.put=function(opt,callback) {
	var sql = 'UPDATE news SET classFirstId="' + opt.classFirstId + '",classChildId="' + opt.classChildId + '",newsUrl="' + opt.newsUrl + '",subTitle="' + opt.subTitle + '",title="' + opt.title + '",subKeywords="' + opt.subKeywords + '",keywords="' + opt.keywords + '",source="' + opt.source + '",description="' + opt.description + '",author="' + opt.author + '",time="' + opt.time + '",nContent="' + opt.nContent + '" WHERE id =' + id
	db.query(sql, function(err, rows) {
		callback(err, rows)
	});
}

//所有新闻
exports.newsList=function(newsClassId,callback) {
	var sql = 'SELECT * FROM news where classChildId="' + newsClassId+'" ORDER BY time DESC'
	db.query(sql, function(err, rows) {
		callback(err, rows)
	});
}

//获取指定新闻
exports.newsDetail=function(id,callback) {
	var sql = 'SELECT * FROM news where id=' + id
	db.query(sql, function(err, rows) {
		callback(err, rows)
	});
}