var db = require("../../lib/db.lib.js");

//新增研究员
exports.add=function(options,callback) {
	var opt='insert into boffins (id,name,baidu_url,description,post_time)values(id,"'+options.name+'","'+options.baiduUrl+'","'+options.description+'","'+options.postTime+'")';
	db.query(opt, function(err, rows) {
		callback(err, rows)
	});
}

//获取所有研究员信息
exports.list=function(callback) {
	var opt='select * from boffins';
	db.query(opt, function(err, rows) {
		callback(err, rows)
	});
}


//获取指定研究员信息
exports.detail=function(id,callback) {
	var opt='select * from boffins where id="'+id+'"';
	db.query(opt, function(err, rows) {
		callback(err, rows)
	});
}


//获取指定研究员信息
exports.put=function(options,callback) {
	var opt='UPDATE boffins SET name="'+options.name+'", baidu_url="'+options.baiduUrl+'",description="'+options.description+'",post_time="'+options.postTime+'" WHERE id="'+options.uid+'"';
	db.query(opt, function(err, rows) {
		console.log(rows)
		callback(err, rows)
	});
}


//删除研究员
exports.del=function(id,callback) {
	var opt='delete from reports where id='+id;
	db.query(opt, function(err, rows) {
		callback(err, rows)
	});
}