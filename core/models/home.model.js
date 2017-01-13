var db = require("../../lib/db.lib.js");



//要闻列表
exports.articles = function(req, res, callback) {
	var sql = 'SELECT title,description,keywords,subTitle,subKeywords,nContent,time from news where newsUrl ="'+req.originalUrl.substr(1)+'"'+
	'UNION ALL SELECT null,null,b.id,b.subTitle,b.directoryName,null,null FROM news a,newsclass b where a.classFirstId=b.id and a.newsUrl ="'+req.originalUrl.substr(1)+'"'+
	'UNION ALL SELECT null,null,b.id,b.subTitle,b.directoryName,null,null FROM news a,newsclass b where a.classChildId=b.id and a.newsUrl ="'+req.originalUrl.substr(1)+'"'

	db.query(sql, function(err, rows) {
		callback(err,rows)
	})
};
