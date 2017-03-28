var filter = require("../../lib/filter.lib");
var logger = require('../../lib/logger.lib');
var newsService=require("../services/api_news.service");
var newsMod =require("../models/api_news.model")
//添加新闻
exports.add = function(req, res) {
	newsService.add(req,res,function(err,rows){
		if(err){
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}

//删除指定新闻
exports.delNews=function(req,res){
	newsMod.del(req.params.id,function(err,rows){
		if(err){
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}

//编辑指定新闻
exports.put=function(req,res){
	newsService.put(req,res,function(err,rows){
		if(err){
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}

//新闻列表
exports.newsList=function(req,res){
	var newsClassId = req.query.newsClassId;
	newsMod.newsList(newsClassId,function(err,rows){
		if(err){
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}


//获取指定新闻
exports.newsDetail=function(req,res){
	var id = req.params.id;
	newsMod.newsDetail(id,function(err,rows){
		if(err){
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
	
}
