var boffinsModel = require("../models/boffins.model");
var filter = require("../../lib/filter.lib");

exports.add = function(req, res,callback) {
	var boffins={};
		boffins.name=req.body.boffinName;
		boffins.baiduUrl=req.body.baiduUrl;
		boffins.description=req.body.description;
		boffins.postTime=req.body.postTime;
		boffinsModel.add(boffins,function(err,rows){
			if(err){
				err.type='database';
				return callback(err)
			}
			callback(null,rows)
		});
}

exports.list = function(callback) {
		boffinsModel.list(function(err,rows){
			if(err){
				err.type='database';
				return callback(err)
			}
			callback(null,rows)
		});
}

exports.put = function(req, res,callback) {
		var boffins={};
		boffins.uid=req.params.id;
		boffins.name=req.body.boffinName;
		boffins.baiduUrl=req.body.baiduUrl;
		boffins.description=req.body.description;
		boffins.postTime=req.body.postTime;
		console.log(boffins)
		boffinsModel.put(boffins,function(err,rows){
			if(err){
				err.type='database';
				return callback(err)
			}
			callback(null,rows)
		});
}

//详细
exports.detail= function(id,callback) {
		boffinsModel.detail(id,function(err,rows){
			if(err){
				err.type='database';
				return callback(err)
			}
			callback(null,rows)
		});
}
////删除
//exports.del = function(id,callback) {
//		boffinsModel.del(id,function(err,rows){
//			if(err){
//				err.type='database';
//				return callback(err)
//			}
//			callback(null,rows)
//		});
//}