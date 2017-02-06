var db = require("../../lib/db.lib.js");

//访问新闻
exports.articles = function(req, res, callback) {
	var url = req.originalUrl.substr(1);
	if(req.params.id && req.params.id.split('-').length !== 1) {
		url = req.originalUrl.substr(1).split('-')[0] + '.html';
	}
	var sql = ['SELECT title,description,keywords,subTitle,subKeywords,nContent,newsUrl,time from news where newsUrl ="' + url + '"' +
		'UNION ALL SELECT null,null,b.id,b.subTitle,b.directoryName,null,null,null FROM news a,newsclass b where a.classFirstId=b.id and a.newsUrl ="' + url + '"' +
		'UNION ALL SELECT null,null,b.id,b.subTitle,b.directoryName,null,null,null FROM news a,newsclass b where a.classChildId=b.id and a.newsUrl ="' + url + '"', 
		'UPDATE news SET pv = pv+1 WHERE newsUrl = "' + url + '"'
	];
	//	var sql = 'SELECT title,description,keywords,subTitle,subKeywords,nContent,newsUrl,time from news where newsUrl ="'+url+'"'+
	//	'UNION ALL SELECT null,null,b.id,b.subTitle,b.directoryName,null,null,null FROM news a,newsclass b where a.classFirstId=b.id and a.newsUrl ="'+url+'"'+
	//	'UNION ALL SELECT null,null,b.id,b.subTitle,b.directoryName,null,null,null FROM news a,newsclass b where a.classChildId=b.id and a.newsUrl ="'+url+'"'
	db.query(sql[0], function(err, rows) {
		callback(err, rows)
		if(rows.length !== 0&&!err) {
			db.query(sql[1], function(err1, rows) {})
		}
	})
};