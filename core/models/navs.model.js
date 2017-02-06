const db = require("../../lib/db.lib.js");

function nav (callback) {
	db.query('SELECT * from newsclass where firstId =0',function(err,rows){
		callback(err,rows)
	})

}

exports.nav=nav;