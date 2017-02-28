var reportsModel = require("../models/reports.model");
var filter = require("../../lib/filter.lib");

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
		report.reportCatalog = req.body.reportCatalog.filterHtml();
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
	var report={};
		report.id=req.params.id;
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
		report.reportCatalog = req.body.reportCatalog.filterHtml();
		report.reportShart=req.body.reportShart||'';
		report.reportType = ''; //报告类型
		report.researchField = ''; //研究领域
		report.coverImg = '';
		report.subKeywords = req.body.keywords; //页面关键词与keywords使用同一个数据
		report.pv = req.body.pv;
		reportsModel.put(report,function(err,rows){
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
//新增报告后,完善url
exports.putReportUrl = function(id,callback) {
		reportsModel.putReportUrl(id,function(err,rows){
			if(err){
				err.type='database';
				return callback(err)
			}
			callback(null,rows)
		});
}