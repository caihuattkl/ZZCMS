const db = require("../../lib/db.lib.js"),
	async = require('async'),
	logger = require('morgan');
	categoriesServices = require("../services/home.service");

exports.home = function(req, res, next) {
	var sql = "select id,uuid,subTitle,newsurl,time from news limit 0,15"
	db.query(sql, function(err, rows) {
		if(!err) {
			res.render("template/index", {
				datas: rows
			});
		}
	})
};

exports.articles = function(req, res, next) {
	var oUrl = req.originalUrl;
	//缓存url
	categoriesServices.cacheDirectory(function(err, directorys) {
		if(!err) {
			var result = null;
			directorys.fristDirectory.forEach(function(val, index) {
				if(new RegExp(val.directoryName).test(oUrl.split("/")[1])){
					result = true;
				}
			})
			if(result) {
				return categoriesServices.articlesRender(req, res, next);
			}
				return next()
		}
		logger[err.type]().error(err);
		return res.status(500).end();
	})
};

exports.channel = function(req, res, next) {
	var oUrl = req.originalUrl;
	//缓存url
	categoriesServices.cacheDirectory(function(err, directorys) {
		if(!err) {
			var result = null;
			directorys.fristDirectory.forEach(function(val, index) {
				if(new RegExp(val.directoryName).test(oUrl.split("/")[1])){
					result = true;
				}
			})
			if(result) {
				return categoriesServices.channelRender(req, res, next);
			}
				return next()
		}
		logger[err.type]().error(err);
		return res.status(500).end();
	})
};

exports.class = function(req, res, next) {
	var oUrl = req.originalUrl;
	categoriesServices.cacheDirectory(function(err, directorys) {
			if(!err) {
			var result = null;
			directorys.fristDirectory.forEach(function(val, index) {
				if(new RegExp(val.directoryName).test(oUrl.split("/")[1])){
					directorys.childDirectory.forEach(function(v,i){
						if(new RegExp(v.directoryName).test(oUrl.split("/")[2])){
							result=true;
						}
					})
				}
			})
			if(result) {
				return categoriesServices.classRender(req, res, next);
			}
				return next()
		}
		logger[err.type]().error(err);
		return res.status(500).end();
	})

};