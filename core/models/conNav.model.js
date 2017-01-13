const db = require("../../lib/db.lib.js");

var connNav = function(callback) {
	db.query('SELECT * from newsclass where firstId =0', function(err, rows) {
		callback(err, rows);
	})
};

module.exports=connNav;