var newsClassModel = require("../models/api_newsClass.model");
var filter = require("../../lib/filter.lib");

exports.addNewsClass = function(req, res,callback) {
	var obj = {};
	obj.firstId = req.body.firstId;
	obj.url = req.body.url;
	obj.directoryName = req.body.directoryName;
	obj.subTitle = req.body.subTitle;
	obj.title = req.body.title;
	obj.keywords = req.body.keywords;
	obj.description = req.body.description;
	obj.time = req.body.time;
	newsClassModel.addNewsClass(obj, function(err, rows) {
		if(err) {
			err.type = 'database';
			return callback(err)
		}
		callback(null, rows)
	});
}


exports.putNewsClass = function(req, res,callback) {
	
	var obj = {};
	obj.id = req.body.id;
	obj.url = req.body.url;
	obj.directoryName = req.body.directoryName;
	obj.subTitle = req.body.subTitle;
	obj.title = req.body.title;
	obj.keywords = req.body.keywords;
	obj.description = req.body.description;
	obj.time = req.body.time;

	newsClassModel.putNewsClass(obj, function(err, rows) {
		if(err) {
			err.type = 'database';
			return callback(err)
		}
		callback(null, rows)
	});
}