var fs = require("fs");
var path = require('path');
var passport = require('passport');
var error404 = require('./errors.controller').notFound;
var captchapng = require('captchapng');
var requireAll = require('require-all');
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
	//	res.redirect('/login');
	res.redirect('/');
};

exports.apiAuthenticated = function(req, res, next) {
	if(req.isAuthenticated()) return next();
	//	res.redirect('/login');
	res.redirect('/');
};


exports.adminAll = function(req, res, next) {
	var admin = "admin";
	fs.readdir('./views/admin', function(err, files) {
		if(err) {
			throw err;
		}
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
	});
};

//验证码
exports.captchap = function(req, res, next) {
	var width = !isNaN(parseInt(req.query.width)) ? parseInt(req.query.width) : 80;
	var height = !isNaN(parseInt(req.query.height)) ? parseInt(req.query.height) : 20;
	var code = parseInt(Math.random() * 9000 + 1000);
	if(req.query.t) { //如果t参数有效
		code = req.query.t;
		req.session.checkcode = code;
		var p = new captchapng(width, height, code);
		p.color(0, 0, 0, 0);
		p.color(80, 80, 80, 255);
		var img = p.getBase64();
		var imgbase64 = new Buffer(img, 'base64');
		res.writeHead(200, {
			'Content-Type': 'image/png'
		});
		res.end(imgbase64);
	} else {
		req.session.checkcode = code;
		var p = new captchapng(width, height, code);
		p.color(0, 0, 0, 0);
		p.color(80, 80, 80, 255);
		var img = p.getBase64();
		var imgbase64 = new Buffer(img, 'base64');
		res.writeHead(200, {
			'Content-Type': 'image/png'
		});
		res.end(imgbase64);
	}

}