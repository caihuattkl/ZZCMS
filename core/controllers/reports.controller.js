var filter = require("../../lib/filter.lib");
var async = require('async');
var reportsModel = require("../models/reports.model");
var CacheClassServices = require("../services/CacheClass.service");
var reportsService = require("../services/reports.service");


exports.edit = function(req, res, next) {
	res.render('admin/editReports', {
		reportId: req.query.reportId,
		firstClass: req.query.firstClass,
		childClass: req.query.childClass
	})
};

//报告正文
exports.report = function(req, res) {
	var reportId = req.params.id.split(/[a-zA-Z]+/)[1];
	async.auto({
		//报告信息
		reportDetail: function(callback) {
			reportsModel.detail(reportId, (err, rows) => {
				if(err) return res.status(500).end('500 - Server Error');
				var reportObj = {};
				reportObj = rows[0];
				//获取面包屑
				CacheClassServices.cacheReportsClass((err, rows) => {
					rows.forEach(function(v, i) {
						if(reportObj.frist_class == v.id) {
							reportObj.fristClassText = v.sub_title;
							reportObj.fristDirectory = v.reports_directory;
						}
						v.child.forEach(function(val, ind) {
							if(reportObj.child_class == val.id) {
								reportObj.childClassText = val.sub_title;
								reportObj.childDirectory = val.reports_directory;
							}
						})
					})
					callback(null, reportObj)
				})
			})
		},
		//新闻主频道头部 
		navbarMenu: function(callback) {
			CacheClassServices.cacheNewsClass(callback)
		},
		reportClassMenu: function(callback) {
			CacheClassServices.cacheReportsClass(callback)
		},
	}, function(_error, data) {
		if(_error) return res.status(500).end('500 - Server Error');
		res.render('template/reports_report', {
			reportDetail: data.reportDetail,
			navbarMenu: data.navbarMenu,
			time: data.reportDetail.post_time.formatTime(),
			reportClassMenu: data.reportClassMenu
		})
	});
};

//报告栏目
exports._class = function(req, res) {
	async.parallel({
		reportClassInfo: function(callback) {
			CacheClassServices.cacheReportsClass(function(err, rows) {
				if(err) { return res.status(500).end('500 - Server Error') }

				rows.forEach(function(v, i) {
					if(v.reports_directory == req.url.substr(1).split('/')[1]) {
						return callback(null, v)
					}
					v.child.forEach(function(val, ind) {
						if(val.reports_directory == req.url.substr(1).split('/')[1]) {
							return callback(null, val)
						}
					})
				})
			})
		},
		reportClassCrumbs: function(callback) {
			CacheClassServices.cacheReportsClass(function(err, rows) {
				if(err) { return res.status(500).end('500 - Server Error') }

				rows.forEach(function(v, i) {
					if(v.reports_directory == req.url.substr(1).split('/')[1]) {
						return callback(null, v)
					}
					v.child.forEach(function(val, ind) {
						if(val.reports_directory == req.url.substr(1).split('/')[1]) {
							return callback(null, v)
						}
					})
				})
			})
		},
		reportClassMenu: function(callback) {
			CacheClassServices.cacheReportsClass(callback)
		},
		reportsList: function(callback) {
			var obj = {};
			CacheClassServices.cacheReportsClass(function(err, rows) {
				if(err) { return res.status(500).end('500 - Server Error') }
				rows.forEach(function(v, i) {
					if(v.reports_directory == req.url.substr(1).split('/')[1]) {
						obj.firstClass = v.id;
						return reportsModel._class(obj, callback)
					}
					v.child.forEach(function(val, ind) {
						if(val.reports_directory == req.url.substr(1).split('/')[1]) {
							obj.childClass = val.id;
							return reportsModel._class(obj, callback)
						}
					})
				})
			})
		},
		navbarMenu: function(callback) {
			CacheClassServices.cacheNewsClass(callback)
		}
	}, function(error, reslut) {
		if(error) { return res.status(500).end('500 - Server Error') }
		res.render('template/reports_class', {
			reportClassInfo: reslut.reportClassInfo,
			reportClassCrumbs: reslut.reportClassCrumbs,
			reportClassMenu: reslut.reportClassMenu,
			reportsList: reslut.reportsList,
			navbarMenu: reslut.navbarMenu
		})
	});
};

exports.channel = function(req, res, next) {
	async.auto({
		reportClassMenu:function(callback) {
			CacheClassServices.cacheReportsClass(callback)
		},
		navbarMenu: function(callback) {
			CacheClassServices.cacheNewsClass(callback)
		},
		/*频道页,每个栏目取最新5条报告数据*/
		classDetails:['reportClassMenu',function(_classDetails,callback){
			/*每个栏目获取的5条记录数*/
			reportsService.classDetails(function(err,rows){
				if(err) { return res.status(500).end('500 - Server Error111') }
				/*//报告分类缓存数据*/
				var obj={},arr=[];
				_classDetails.reportClassMenu.forEach((v,i)=>{
					obj=v;
					obj.data=[];
					rows.forEach((val,ind)=>{
						if(v.id==val.frist_class){
							obj.data.push(val)
						}
					})
					arr.push(obj)
				})
				callback(null,arr)
			})
		}]
	}, function(error, reslut) {
		if(error) { return res.status(500).end('500 - Server Error111') }
		res.render('template/reports_channel', {
			title:"行业研究报告，市场研究报告，行业分析报告，市场调查报告，投资咨询报告，产业分析报告",
			reportClassInfo: reslut.reportClassInfo,
			reportClassMenu: reslut.reportClassMenu,
			navbarMenu: reslut.navbarMenu,
			reportsTree:reslut.reportClassMenu,
			reportsClassDetails:reslut.classDetails
		})
	});
};