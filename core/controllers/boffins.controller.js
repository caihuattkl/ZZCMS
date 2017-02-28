var db = require("../../lib/db.lib.js");
var dbSync = require("../../lib/dbSync.lib.js");
var filter = require("../../lib/filter.lib");
var logger = require('../../lib/logger.lib');
var reportsService=require("../services/reports.service");


exports.add = function(req, res, next) {
	res.render('admin/editReports',{
		reportId:req.query.reportId,
		firstClass:req.query.firstClass,
		childClass:req.query.childClass
	})
};

//exports.del = function(req, res, next) {
//	res.render('admin/editReports',{
//		reportId:req.query.reportId,
//		firstClass:req.query.firstClass,
//		childClass:req.query.childClass
//	})
//};
//
//exports.put = function(req, res, next) {
//	res.render('admin/editReports',{
//		reportId:req.query.reportId,
//		firstClass:req.query.firstClass,
//		childClass:req.query.childClass
//	})
//};
