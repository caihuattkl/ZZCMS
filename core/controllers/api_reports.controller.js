var logger = require('../../lib/logger.lib');
var reportsService=require("../services/reports.service");

//新增报告
exports.add = function(req, res) {
	reportsService.add(req,res,function(err,rows){
		if(err){
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		exports.putReportUrl(rows.insertId,res)
	})
}
//新增报告后,完善url
exports.putReportUrl=function(id,res){
	var id=id||'';
	reportsService.putReportUrl(id,function(err,rows){
		if(err){
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		console.log(rows)
		res.status(200).json(rows);
	})
}

//报告更新
exports.put = function(req, res) {
	reportsService.put(req,res,function(err,rows){
		if(err){
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}


//新增报告
exports.list = function(req, res) {
	reportsService.list(function(err,rows){
		if(err){
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}
//获取指定类报告
exports._class = function(req, res) {
	reportsService._class(req,res,function(err,rows){
		if(err){
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}

//删除报告
exports.del = function(req, res) {
	reportsService.del(req.params.id,function(err,rows){
		if(err){
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}

//报告详细
exports.detail = function(req, res) {
	reportsService.detail(req.params.id,function(err,rows){
		if(err){
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}

//报告搜索
