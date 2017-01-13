const db = require("../../lib/db.lib.js"),
	async = require('async'),
	logger = require('morgan'),
	directorySev = require("../services/directorys.service"),
	homeMod = require("../models/home.model"),
	filter = require("../../lib/filter.lib");

exports.home = function(req, res, next) {
	var sql = "select id,subTitle,newsurl,time from news limit 0,15"
	db.query(sql, function(err, rows) {
		if(!err) {
			res.render("template/index", {
				datas: rows
			});
		}
	})
};
