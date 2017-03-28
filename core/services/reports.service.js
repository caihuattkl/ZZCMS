var reportsModel = require("../models/reports.model");
var filter = require("../../lib/filter.lib");
var cache = require('../../lib/cache.lib');
var async = require('async');
var _ = require('lodash');


exports.add = function(req, res,callback) {
	var report={};
		report.fristClass = req.body.fristClass;
		report.childClass = req.body.childClass;
		report.reportUrl = req.body.reportUrl.split(/.html/)[0].split(/\/reports\//)[1]||'';
		report.subTitle = req.body.subTitle;
		report.title = req.body.title;
		report.coreKeywords = req.body.coreKeywords;
		report.keywords = req.body.keywords;
		report.relatedReport = req.body.relatedReport;
		report.latestRevision = req.body.latestRevision;
		report.postTime = req.body.postTime;
		report.description = req.body.description;
		report.doubleVersion = req.body.doubleVersion;
		report.pdfPrice = req.body.pdfPrice;
		report.entityPrice = req.body.entityPrice;
		report.reportAuthor = req.body.reportAuthor;
		report.deliveryMode = req.body.deliveryMode;
		report.reportFormat = req.body.reportFormat;
		report.reportSummary = req.body.reportSummary;
		report.reportCatalog = req.body.reportCatalog.filterColon();
		report.reportShart=req.body.reportShart||'';
		report.reportType = ''; //报告类型
		report.researchField = ''; //研究领域
		report.coverImg = '';
		report.subKeywords = req.body.keywords; //页面关键词与keywords使用同一个数据
		report.pv = req.body.pv;
		reportsModel.add(report,function(err,rows){
			if(err){
				err.type='database';
				return callback(err)
			}
			callback(null,rows)
		});
}

exports.put = function(req, res,callback) {
	
	var reports={};
		reports.id=req.params.id;
		reports.fristClass = req.body.fristClass;
		reports.childClass = req.body.childClass;
		reports.reportUrl = req.body.reportUrl.split(/.html/)[0].split(/\/reports\//)[1]||'';
		reports.subTitle = req.body.subTitle;
		reports.title = req.body.title;
		reports.coreKeywords = req.body.coreKeywords;
		reports.keywords = req.body.keywords;
		reports.relatedReport = req.body.relatedReport;
		reports.latestRevision = req.body.latestRevision;
		reports.postTime = req.body.postTime;
		reports.description = req.body.description;
		reports.doubleVersion = req.body.doubleVersion;
		reports.pdfPrice = req.body.pdfPrice;
		reports.entityPrice = req.body.entityPrice;
		reports.reportAuthor = req.body.reportAuthor;
		reports.deliveryMode = req.body.deliveryMode;
		reports.reportFormat = req.body.reportFormat;
		reports.reportSummary = req.body.reportSummary;
		reports.reportCatalog = req.body.reportCatalog.filterColon();
		reports.reportShart=req.body.reportShart||'';
		reports.reportType = ''; //报告类型
		reports.researchField = ''; //研究领域
		reports.coverImg = '';
		reports.subKeywords = req.body.keywords; //页面关键词与keywords使用同一个数据
		reports.pv = req.body.pv;
		reportsModel.put(reports,function(err,rows){
			if(err){
				err.type='database';
				return callback(err)
			}
			callback(null,rows)
		});
}

exports.list = function(callback) {
		reportsModel.list(function(err,rows){
			if(err){
				err.type='database';
				return callback(err)
			}
			callback(null,rows)
		});
}

exports._class = function(req, res,callback) {
		var opt={};
		opt.firstClass=req.params.firstClass;
		opt.childClass=req.params.childClass==0?'[0-9]+':req.params.childClass;
		reportsModel._class(opt,function(err,rows){
			if(err){
				err.type='database';
				return callback(err)
			}
			callback(null,rows)
		});
}
//详细
exports.detail= function(id,callback) {
		reportsModel.detail(id,function(err,rows){
			if(err){
				err.type='database';
				return callback(err)
			}
			callback(null,rows)
		});
}

//删除
exports.del = function(id,callback) {
		reportsModel.del(id,function(err,rows){
			if(err){
				err.type='database';
				return callback(err)
			}
			callback(null,rows)
		});
}

//报告频道每个栏目获取5条记录  缓存频道页面数据
exports.classDetails=function(callback){
	var classDetails = cache.get('classDetails');
	if(classDetails) {
//		console.log("缓存",classDetails)
		callback(null,_.cloneDeep(classDetails))
	} else {
		async.parallel([
			function(callback){
				reportsModel.classDetails(callback)
			}
		], function(error, result) {
			if(error) {
				err.type='database';
				return callback(err)
			}
//			console.log("缓存1",result[0])
			callback(null,result[0])
			cache.set('classDetails', result[0], 1000 * 60 * 60 * 24);
		});
	}
}
