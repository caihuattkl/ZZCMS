const
	db = require("../../lib/db.lib.js"),
	fs = require("fs"),
	async = require('async'),
	logger = require('morgan'),
	adminModel = require("../models/admin.model"),
	passport = require('passport'),
	captchapng=require('captchapng');

exports.login = function(req, res, next) {
	res.render('admin/login')
};

exports.loginPost = function(req, res, next) {
	passport.authenticate('local', function(err, user, info) {
		if(err) {
			return next(err);
		}
		if(!user) {
			req.flash('error', info.message);
			return res.redirect('/login');
		}
		req.logIn(user, function(err) {
			if(err) return next(err);
			res.redirect(303, '/admin/index.html');
		})
	})(req, res, next);
};

exports.logout = function(req, res, next) {
	req.logout();
	res.redirect('/login');
};

exports.authenticated = function(req, res, next) {
	if(req.isAuthenticated()) return next();
	res.redirect('/login');
};

exports.apiAuthenticated = function(req, res, next) {
	if(req.isAuthenticated()) return next();
	res.redirect('/login');
};

exports.adminHome = function(req, res, next) {
	var admin = "admin";
	fs.readdir('./views/admin', function(err, files) {
		if(!err) {
			var result;
			for(var i = 0; i < files.length; i++) {
				if(req.originalUrl.indexOf('/' + admin + '/' + files[i].replace(/.hbs/g, '.html')) == 0) {
					res.render(admin + '/' + files[i], {
						username: req.session.passport.user.name
					});
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
};

exports.newsList = function(req, res, next) {
	res.render('admin/newsList', {
		newsClassId: req.query.newsClassId
	});
};

exports.addNews = function(req, res, next) {

	return adminModel.addNews(req, res, function(data) {
		console.log(data);
		res.render('admin/addNews', {
			classChildId: req.query.classChildId,
			classFirstId: req.query.classFirstId,
			url:data[0].directoryName+'/'+new Date().getFullYear()+''+(new Date().getMonth()+1)+''+new Date().getDate()+'/'+parseInt(1000*Math.random())+(+new Date()).toString().substr(8,5)+".html"
		});
	})

};

exports.editNews = function(req, res, next) {
	res.render('admin/editNews', {
		newsId: req.query.newsId,
		classFirstId: req.query.classFirstId,
		classChildId: req.query.classChildId
	});
};