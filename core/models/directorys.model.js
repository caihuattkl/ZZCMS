var db = require("../../lib/db.lib.js");

module.exports = function(callback) {
	var sql = 'select * from news_class',obj = {},arr = [];
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			return callback(err || 'directorys the data  is null')
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