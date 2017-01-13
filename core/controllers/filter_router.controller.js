const db = require("../../lib/db.lib.js"),
	async = require('async'),
	logger = require('morgan');
	
exports.filter = function(req, res, next) {
	next()
};