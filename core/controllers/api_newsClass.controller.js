var filter = require("../../lib/filter.lib");
var newsClassMod = require("../models/api_newsClass.model");
var newsClassService = require("../services/api_newsClass.service");
var newsClassList = require("../models/cacheClass.model");

//新闻分类列表
exports.newsClassList = function(req, res) {
	newsClassList.cacheNewsClass(function(err, rows) {
		res.status(200).json(rows);
	})
}
//新闻分类增
exports.addNewsClass = function(req, res) {
	newsClassService.addNewsClass(req, res, function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}

//新闻分类删*
exports.delNewsClass = function(req, res) {
	newsClassMod.delNewsClass(req.params.id, function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}

//新闻分类改
exports.putNewsClass = function(req, res) {
	console.log('putNewsClass_11111111111111111111111111111')
	newsClassService.putNewsClass(req, res, function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}

//获取新闻所有顶级分类
exports.newsTopClassList = function(req, res) {
	newsClassList.cacheNewsClass(function(err, rows) {
		res.status(200).json(rows);
	})
}

//新闻分类某条记录
exports.newsClassDetail = function(req, res) {
	var id = req.params.id;
	newsClassList.cacheNewsClass(function(err, rows) {
		rows.forEach((val, ind)=> {
			if(val.id == id) {
				res.status(200).json(val);
			}
			val.child.forEach((v, i) => {
				if(v.id == id) {
					res.status(200).json(v);
				}
			})
		})
	})
}