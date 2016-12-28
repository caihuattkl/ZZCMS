var fs = require("fs"),
	db = require("../../config/db.js"),
	md5 = require("md5");

exports.home = function(req, res) {
	var admin = "admin";
	fs.readdir('./views/admin', function(err, files) {
		if(!err) {
			var result;
			for(var i = 0; i < files.length; i++) {
				if(req.originalUrl.indexOf('/' + admin + '/' + files[i].replace(/.hbs/g, '.html')) == 0) {
					res.render(admin + '/' + files[i],{ username:req.session.passport.user.name});
					result = true;
					break;
				} else {
					result = false;
				}
			}
			if(!result) {
				res.render(admin + '/' + '404');
			}
			return;
		}
		throw err;
	});
}

//exports.login = function(req, res) {
//	var userName = req.body.userName,
//		password = md5(req.body.password);
//	var sql = "SELECT name,password FROM users WHERE name ='" + userName + "' and password='" + password + "'"
//	db.query(sql, function(err, rows) {
//		if(!err && rows.length != 0 && userName === rows[0].name && password == rows[0].password) {
//			res.redirect('/admin/index');
//		} else {
//			res.json({
//				code: 200,
//				message: "用户名或密码错误!"
//			})
//		}
//	})
//}

//新闻分类
exports.newsList = function(req, res) {
	res.render('admin/newsList', {
		newsClassId: req.query.newsClassId
	});
}

//添加新闻
exports.addNews = function(req, res) {
	res.render('admin/addNews', {
		classChildId: req.query.classChildId,
		directoryName: req.query.directoryName,
		classFirstText: req.query.directoryName,
		classChildText: req.query.classChildText,
		classFirstId: req.query.classFirstId
	});
}

//编辑新闻
exports.editNews = function(req, res) {
	res.render('admin/editNews', {
		newsId: req.query.newsId,
		classFirstId: req.query.classFirstId,
		classChildId: req.query.classChildId
	});
}