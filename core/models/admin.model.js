const db = require("../../lib/db.lib.js");

exports.addNews = function(req,res,callback) {
		db.query('select * from news_class where id="'+req.query.classFirstId+'"', function(err, rows) {
			if(!err) {
				callback(rows)
			}
		})
}
