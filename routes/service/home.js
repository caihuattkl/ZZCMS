const db = require("../../config/db.js"),
	formatDate = require("../../core/filter/formatDate");

exports.index = function(req, res, next) {
	var sql = "select id,uuid,subTitle,newsurl,time from news limit 0,15"
	db.query(sql, function(err, rows) {
		if(!err) {
			res.render("template/index", {
				datas: rows
			});
		}
	})
};

exports.qiche = function(req, res) {
	var sql ='SELECT title,description,keywords,subTitle,subKeywords,nContent,time from news where uuid = "'+req.originalUrl.match(/[\d]{13}/)+'" or newsUrl = "'+req.originalUrl.substr(1)+'"'+
	'UNION ALL SELECT null,null,null,b.subTitle,b.directoryName,null,null FROM news a,newsclass b where a.classFirstId=b.id and a.uuid ="'+req.originalUrl.match(/[\d]{13}/)+'" and a.newsUrl ="'+req.originalUrl.substr(1)+'"'+
	'UNION ALL SELECT null,null,null,b.subTitle,b.directoryName,null,null FROM news a,newsclass b where a.classChildId=b.id and a.uuid ="'+req.originalUrl.match(/[\d]{13}/)+'" and a.newsUrl ="'+req.originalUrl.substr(1)+'"'
	db.query(sql, function(err, rows) {
		if(!err) {
			res.render('template/article_article', {
				classFirstText: rows[1].subTitle,
				classFirstDirectoryName:rows[1].subKeywords,
				classChildText: rows[2].subTitle,
				classChildDirectoryName: rows[2].subKeywords,
				subTitle: rows[0].subTitle,
				nContent: rows[0].nContent,
				time: formatDate(rows[0].time, 'yyyy-MM-dd HH:mm:ss'),

			});
		}

	})
};

exports.zhengquan = function(req, res) {
	var sql = 'select * from news where newsUrl="' + req.originalUrl.substr(1) + '"'
	db.query(sql, function(err, rows) {
		if(!err) {
			res.render('template/article_article', {
				classFirstText: rows[0].classFirstText,
				classChildText: rows[0].classChildText,
				subTitle: rows[0].subTitle,
				nContent: rows[0].nContent,
				time: formatDate(rows[0].time, 'yyyy-MM-dd HH:mm:ss'),

			});
		}
	})

};