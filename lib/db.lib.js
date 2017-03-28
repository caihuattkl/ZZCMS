/**
 * Created by Administrator on 2016/7/19.
 */
// 连接MySQL
var mysql = require('mysql');
var pool = mysql.createPool({
	multipleStatements: true,
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'test',
	port: '3306'
});

function query(sql, callback) {
	pool.getConnection(function(err, connection) {
		if(err){
			err.type='system';
			return callback(err,connection);
		}
		connection.query(sql, function(err1, rows) {	
			callback(err1, rows);
			connection.release(); //释放链接
		});
	});
}


exports.query = query;