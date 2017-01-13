const db = require("../../lib/db.lib.js");

exports.addNews = function(req,res,callback) {
		db.query('select * from newsclass where id="'+req.query.classFirstId+'"', function(err, rows) {
			if(!err) {
				callback(rows)
			}
		})
}
