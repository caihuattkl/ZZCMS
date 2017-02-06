/**
 * Created by Administrator on 2016/7/19.
 */
// 连接MySQL
var mysql = require('mysql');
var pool = mysql.createPool({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'test',
	port: '3306'
});

function query(sql) {
	return new Promise((resolve, reject) => {
		pool.getConnection(function(err, connection) {
			// Use the connection
			connection.query(sql, function(err1, rows) {
				if(err1){reject(err1)}
				resolve(rows);
				connection.release(); //释放链接
			});
		});
	})
}

exports.query = query;