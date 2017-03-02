var db = require("../../lib/db.lib.js");

//新增报告
exports.add=function(options,callback) {
	var sql = 'insert into news(id,classFirstId,classChildId,newsUrl,subTitle,title,subKeywords,keywords,source,description,author,time,nContent)values("id","' + options.classFirstId + '","' + options.classChildId + '","' + options.newsUrl + '","' + options.subTitle + '","' + options.title + '","' + options.subKeywords + '","' + options.keywords + '","' + options.source + '","' + options.description + '","' + options.author + '","' + options.time + '","' + options.nContent + '")'
	db.query(sql, function(err, rows) {
		callback(err, rows)
	});
}