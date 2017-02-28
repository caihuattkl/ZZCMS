var boffinsService = require("../services/boffins.service");
var logger = require('../../lib/logger.lib');

exports.add = function(req, res) {
	boffinsService.add(req, res, function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
};

exports.put = function(req, res, callback) {
	boffinsService.put(req, res, function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	});
}

exports.list = function(req, res) {
	boffinsService.list(function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
};

exports.detail = function(req, res) {
	boffinsService.detail(req.params.id, function(err, rows) {
		if(err) {
			logger[err.type]().error(__filename, err);
			return res.status(500).end();
		}
		res.status(200).json(rows);
	})
};