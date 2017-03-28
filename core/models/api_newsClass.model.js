var db = require("../../lib/db.lib.js");
var logger = require('../../lib/logger.lib');

exports.addNewsClass = function(opt, callback) {
	//判断头条是否存在,防止重复添加主分类
	newsClassValid(opt.directoryName, _newsClassValid)

	function _newsClassValid(err, rows) {
		if(err) {
			return callback(null, err);
		}
		var sql = 'insert into news_class(id,directoryName,firstId,url,subTitle,title,keywords,description,time) values("id",  "' + opt.directoryName + '", "' + opt.firstId + '", "' + opt.url + '", "' + opt.subTitle + '", "' + opt.title + '", "' + opt.keywords + '", "' + opt.description + '", "' + opt.time + '")';
		db.query(sql, function(err, rows) {
			if(err) {
				logger.database().error(__filename, err);
				return callback(err);
			}
			//如果新增的分类是一级分类,设置频道的头条
			if(opt.firstId == 0) {
				return insertTopline(rows.insertId, callback)
			}
			callback(null, rows)
		})
	}
}

//判断头条是否存在,防止重复添加主分类
function newsClassValid(directoryName, callback) {
	var sql = 'select n.directoryName from news_class n where n.directoryName="' + directoryName + '"';
	db.query(sql, function(err, rows) {
		if(err) {
			logger.database().error(__filename, err);
			return callback({ code: 500, msg: "判断顶级分类错误", reslut: "" });
		}
		if(rows.length == 0) {
			return callback(null, true)
		} else {
			return callback({ code: 500, msg: "分类目录名存在,请重新添加!", reslut: "" })
		}
	})
}

//插入头条
function insertTopline(firstId, callback) {
	var sql = 'INSERT INTO topline(id,newsNumber)values(id,"' + firstId + '")'
	db.query(sql, function(err, rows) {
		if(err) {
			logger.database().error(__filename, err);
			return callback(err);
		}
		callback(null, rows)
	})
}

//删除分类
exports.delNewsClass = function(id, callback) {
	chackChildClass(id, _chackChildClass)
	function _chackChildClass(err, rows) {
		if(err) {
			return callback(null, err);
		}
		var sql = "delete from news_class where id=" + id
		db.query(sql, function(err, rows) {
			if(err) {
				logger.database().error(__filename, err);
				return callback(err);
			}
			callback(null, rows)
		})
	}

}
/*
 删除分类判断是否有子分类,如果有不给删除,如果有新闻也不给删除
 * */
function chackChildClass(id, callback) {
	var sql = 'select CONCAT(e.id,n.id) from news_class n,news e where n.firstId ="' + id + '"or e.classFirstId ="' + id +'"or e.classChildId ="' + id + '"LIMIT 1'
	db.query(sql, function(err, rows) {
		if(err) {
			logger.database().error(__filename, err);
			return callback({ code: 500, msg: "删除失败,请刷新重试!", reslut: "" });
		}
		if(rows.length == 0) {
			return callback(null, true)
		} else {
			return callback({ code: 500, msg: "删除失败,该分类下存在子分类或者新闻!", reslut: "" })
		}
	})
}

//删除频道头条
function delTopline(firstId) {
	var topLineSql = 'delete from topline where newsNumber=' + firstId
	db.query(topLineSql, function(err, rows) {
		if(err) throw err;
		console.log("删除了频道ID为:" + firstId + "头条编号!")
	})
}

//修改新闻分类
exports.putNewsClass = function(opt, callback) {
	console.log(opt)
	var sql = 'UPDATE news_class SET url="' + opt.url + '",directoryName="' + opt.directoryName + '",subTitle="' + opt.subTitle + '",title="' + opt.title + '",keywords="' + opt.keywords + '",description="' + opt.description + '",time="' + opt.time + '" WHERE  id =' + opt.id
	db.query(sql, function(err, rows) {
		if(err) {
			logger.database().error(__filename, err);
			return callback(err);
		}
		callback(null, rows)
	})
}
