var logger = require('../../lib/logger.lib');
var adsModel = require("../models/ads.model");
var filter = require("../../lib/filter.lib");

//报告广告
exports.put = function(req, res) {
	adsModel.headlinesPut(req.body, function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}

//广告详细
exports.detail = function(req, res) {
	adsModel.headlinesDetail(function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
}
