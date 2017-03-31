var filter = require("../../lib/filter.lib");
var logger = require('../../lib/logger.lib');
var newsMod = require("../models/api_news.model")
//添加新闻
exports.add = function(req, res) {
	req.body.nContent.filterColon();
	newsMod.add(req.body, function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}

//删除指定新闻
exports.delNews = function(req, res) {
	newsMod.del(req.params.id, function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}

//编辑指定新闻
exports.put = function(req, res) {
	req.body.nContent.filterColon();
	newsMod.put(req.body, function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}

//新闻列表
exports.newsList = function(req, res) {
	newsMod.newsList(req.query, function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}

//获取指定新闻
exports.newsDetail = function(req, res) {
	newsMod.newsDetail(req.params, function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}

//添加信息仓库新闻
exports.infoRepertoryAdd = function(req, res) {
	req.body.nContent.filterColon();
	newsMod.infoRepertoryAdd(req.body, function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}

//提交信息到信息仓库
exports.infoRepertoryToNews = function(req, res) {
	req.body.nContent.filterColon();
	newsMod.infoRepertoryToNews(Object.assign(req.body,req.params), function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}
//添加信息仓库新闻
exports.infoRepertoryList = function(req, res) {
	//判断是否有参数,为空时 有值拿指定值分类,否则拿全部分类数据
	if(req.params.isEmptyObject()) {
		newsMod.infoRepertoryList(req.params, function(err, rows) {
			if(err) {
				logger[err.type]().error(__filename, err);
				return res.status(500).end();
			}
			return res.status(200).json(rows);
		})
	}
//	newsMod.infoRepertoryDetail(req.params, function(err, rows) {
//		if(err) {
//			logger[err.type]().error(__filename, err);
//			return res.status(500).end();
//		}
//		res.status(200).json(rows);
//	})

}

//添加信息仓库新闻详细信息
exports.infoRepertoryDetail = function(req, res) {
	
	newsMod.infoRepertoryDetail(req.params, function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})

}