var cache = require('../../lib/cache.lib');
var _ = require('lodash');
var async = require('async');
var hmModel = require("../models/home.model");

//缓存首页所有数据,每个5分钟刷新数据
module.exports = function(callback) {
	var homeDataCache = cache.get('homeDataCache');
	if(homeDataCache) {
		callback(null, _.cloneDeep(homeDataCache));
	} else {
		
		async.parallel({
			yaowen:function(done) {
				hmModel.yaowen(function(err,yaowen){
					if(!err){
						done(null,yaowen);
					}
				})
			},
			chanyeredian:function(done) {
				hmModel.chanyeredian(function(err,chanyeredian){
					if(!err){
						done(null,chanyeredian);
					}
				})
			},
			hongguan:function(done) {
				hmModel.hongguan(function(err,hongguan){
					if(!err){
						done(null,hongguan);
					}
				})
			},
			chanyeyuce:function(done) {
				hmModel.chanyeyuce(function(err,chanyeyuce){
					if(!err){
						done(null,chanyeyuce);
					}
				})
			},
			chanyezhaoshang:function(done) {
				hmModel.chanyezhaoshang(function(err,chanyezhaoshang){
					if(!err){
						done(null,chanyezhaoshang);
					}
				})
			},
			jinrong:function(done) {
				hmModel.jinrong(function(err,jinrong){
					if(!err){
						done(null,jinrong);
					}
				})
			},
			chanyejihui:function(done) {
				hmModel.chanyejihui(function(err,chanyejihui){
					if(!err){
						done(null,chanyejihui);
					}
				})
			},
			chanyegongsi:function(done) {
				hmModel.chanyegongsi(function(err,chanyegongsi){
					if(!err){
						done(null,chanyegongsi);
					}
				})
			},
			chanyeyujing:function(done) {
				hmModel.chanyeyujing(function(err,chanyeyujing){
					if(!err){
						done(null,chanyeyujing);
					}
				})
			},
			zhengquan:function(done) {
				hmModel.zhengquan(function(err,zhengquan){
					if(!err){
						done(null,zhengquan);
					}
				})
			},
			zhengquancelue:function(done) {
				hmModel.zhengquancelue(function(err,zhengquancelue){
					if(!err){
						done(null,zhengquancelue);
					}
				})
			},
			keji:function(done) {
				hmModel.keji(function(err,keji){
					if(!err){
						done(null,keji);
					}
				})
			},
			shangye:function(done) {
				hmModel.shangye(function(err,shangye){
					if(!err){
						done(null,shangye);
					}
				})
			},
			qiche:function(done) {
				hmModel.qiche(function(err,qiche){
					if(!err){
						done(null,qiche);
					}
				})
			},
			shenghuo:function(done) {
				hmModel.shenghuo(function(err,shenghuo){
					if(!err){
						done(null,shenghuo);
					}
				})
			}
		}, function(error, result) {
			cache.set('homeDataCache', result, 1000 * 60 * 5);
			callback(error, result);
		}
		);
		
		
		
		
	}
};