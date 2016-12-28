const db = require("../../config/db.js"),
	formatDate = require("../../core/filter/formatDate");

exports.index = function(req, res, next) {
	
	var sql = "select id,subTitle,newsurl,time from news limit 1,15"
	db.query(sql, function(err, rows) {
		if(!err) {
			res.render("template/index", {
				datas: rows
			});
		}
	})
};

exports.qiche = function(req, res) {
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