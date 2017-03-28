var logger = require('../../lib/logger.lib');
var adsModel = require("../models/ads.model");
var filter = require("../../lib/filter.lib");
	//新增广告
exports.add = function(req, res) {
		adsModel.add(req.body,function(err, rows) {
			if(err) {
				logger[err.type]().error(__filename, err);
				return res.status(500).end();
			}
			res.status(200).json(rows);
		})
	}


//获取所有广告
exports.list = function(req, res) {
	adsModel.list(function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}


//报告广告
exports.put = function(req, res) {
	var obj={};
	obj.adContent=req.body.adContent.filterColon();
	adsModel.put(Object.assign(req.params,req.body,obj), function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}


//删除广告
exports.del = function(req, res) {
	adsModel.del(req.params.id, function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}

//广告详细
exports.detail = function(req, res) {
	adsModel.detail(req.params.id, function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}
