var db = require("../../lib/db.lib.js");
var logger = require('../../lib/logger.lib');

//新增新闻
exports.add = function(opts, callback) {
	var sql = "INSERT INTO ads (`id`, `adNumber`, `time`, `adContent`, `descriptions`,`adType`)" +
		"VALUES (id, '" + opts.adNumber + "', now(), '" + opts.adContent + "', '" + opts.descriptions + "', '" + opts.adType + "')"
	db.query(sql, function(err, rows) {
		if(err) {
			err.type = 'database';
			logger.database().error(__filename, err);
			return callback(err);
		}
		setAdsNumber(rows.insertId, opts.adType, callback)
	})
}
//新增新闻后,完善url
function setAdsNumber(id, adType, callback) {
	var sql = 'select COUNT(*) count from ads a where adType ="' + adType + '"';
	db.query(sql, function(err, rows) {
		if(err) {
			err.type = 'database';
			logger.database().error(__filename, err);
			return callback(err);
		}
		var count = rows[0].count < 10 ? "0" + rows[0].count : rows[0].count;
		var sql2 = 'update ads set adNumber = concat("' + adType + '","' + count + '") where id ="' + id + '"'
		db.query(sql2, function(err, rows2) {
			if(err) {
				err.type = 'database';
				logger.database().error(__filename, err);
				return callback(err);
			}
			callback(null, rows2)
		})
	})
}

//获取所有广告
exports.list = function(callback) {
	var sql = "select * from ads";
	db.query(sql, function(err, rows) {
		if(err) {
			err.type = 'database';
			logger.database().error(__filename, err);
			return callback(err);
		}
		callback(null, rows);
	});
}

//删除新闻
exports.del = function(id, callback) {
	var sql = "delete from ads where id=" + id
	db.query(sql, function(err, rows) {
		if(err) {
			err.type = 'database';
			logger.database().error(__filename, err);
			return callback(err);
		}
		callback(null, rows);
	});
}

//更新新闻
exports.put = function(opt, callback) {
	var sql = 'UPDATE ads SET adContent="' + opt.adContent + '",descriptions="' + opt.descriptions + '" WHERE id =' + opt.id
	db.query(sql, function(err, rows) {
		if(err) {
			err.type = 'database';
			logger.database().error(__filename, err);
			return callback(err);
		}
		callback(null, rows);
	});
}

//获取指定新闻
exports.detail = function(id, callback) {
	var sql = 'SELECT * FROM ads where id=' + id
	db.query(sql, function(err, rows) {
		if(err) {
			err.type = 'database';
			logger.database().error(__filename, err);
			return callback(err);
		}
		callback(null, rows);
	});
}

/*
 * 所有广告位,缓存时使用
 */
exports.ads = function(callback) {
	var sql = 'select * from ads'
	db.query(sql, function(err, rows) {
		if(err) {
			logger.database().error(__filename, err);
			return callback(err);
		}
		callback(null, rows)
	})
}


//获取首页头条
exports.headlinesDetail = function(callback) {
	var sql = 'SELECT * FROM headlines'
	db.query(sql, function(err, rows) {
		if(err) {
			err.type = 'database';
			logger.database().error(__filename, err);
			return callback(err);
		}
		callback(null, rows);
	});
}

/*头条设置合并到广告里面*/
exports.headlinesPut = function(opt, callback) {
	var news =opt.news;
	for(var i=0;i<news.length;i++){
		if(news[i]=='')
			news[i]='null';
	}
	var sqlIn = 'insert into headlines (id, channelid, news) values (id, "0", "'+news.join()+'")';
	var sqlUp = 'update headlines set channelid="0",news="' + news.join() + '" where channelid = 0';
	var sqlCheack='select count(*) count  from headlines h where channelid="0"'
	db.query(sqlCheack, function(err, rows) {
		if(err){
			err.type = 'database';
			logger.database().error(__filename, err);
			return callback(err);
		}
	
		if(rows[0].count == 0) {
			db.query(sqlIn, function(err1, rows1) {
				if(err1) {
					err1.type = 'database';
					logger.database().error(__filename, err1);
					return callback(err1);
				}
					callback(null,rows1)
			})
		}else{
			db.query(sqlUp, function(err2, rows2) {
				if(err2){
					err2.type = 'database';
					logger.database().error(__filename, err2);
					return callback(err2);
				}
					callback(null,rows2)
			})
		}

	})
}