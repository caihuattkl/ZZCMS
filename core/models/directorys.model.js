var db = require("../../lib/db.lib.js");

exports.fristDirectory = function(callback) {
	var sql = 'select directoryName from newsclass where firstId ="0"';
	db.query(sql, function(err, rows1) {
		if(!err) {
			callback(rows1)
		}
	})
}

exports.childDirectory = function(callback) {
	var sql = 'select directoryName from newsclass where firstId <>"0"';
	db.query(sql, function(err, rows2) {
		if(!err) {
			callback(rows2)
		}
	})
}