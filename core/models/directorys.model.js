var db = require("../../lib/db.lib.js");

exports.fristDirectory = function(callback) {
	var sql = 'select directoryName from news_class where firstId ="0"';
	db.query(sql, function(err, rows1) {
		if(err) { throw err;}
		callback(rows1)
	})
}

exports.childDirectory = function(callback) {
	var sql = 'select directoryName from news_class where firstId <>"0"';
	db.query(sql, function(err, rows2) {
		if(err) { throw err;}
		callback(rows2)
	})
}