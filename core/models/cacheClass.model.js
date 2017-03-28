var db = require("../../lib/db.lib.js");

exports.cacheNewsClass = function(callback) {
	var sql = 'select * from news_class',obj = {},arr = [];
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			return callback(err || 'newsDir the data  is null')
		}
		rows.forEach(function(val, index) {
			if(val.firstId == 0) {
				obj = val;
				obj.child = [];
				rows.forEach(function(v, i) {
					if(v.firstId == obj.id) {
						obj.child.push(v);
					}
				})
				arr.push(obj)
			}
		})
		callback(null, arr)
	})
}

exports.cacheReportsClass = function(callback) {
	var sql = 'select * from report_class',obj = {},arr = [];
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			return callback(err || 'reportDir the data  is null')
		}
		rows.forEach(function(val, index) {
			if(val.frist_class == 0) {
				obj = val;
				obj.child = [];
				rows.forEach(function(v, i) {
					if(v.frist_class == obj.id) {
						obj.child.push(v);
					}
				})
				arr.push(obj)
			}
		})
		callback(null, arr)
	})
}