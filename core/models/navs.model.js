const db = require("../../lib/db.lib.js");

function nav (callback) {
	db.query('SELECT * from news_class where firstId =0',function(err,rows){
		if(err){throw err}
		callback(rows)
	})

}

exports.nav=nav;