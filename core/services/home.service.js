var cache = require('../../lib/cache.lib');
var reportTrees = require('../../lib/reportTreeSet.lib');
var _ = require('lodash');
var async = require('async');
var hmModel = require("../models/home.model");
var CacheClassServices = require("../services/CacheClass.service");


//缓存首页所有数据,间隔5分钟刷新数据
exports.homeClassList = function(callback) {
	var homeDataCache = cache.get('homeDataCache');
	if(homeDataCache) {
		callback(null, _.cloneDeep(homeDataCache));
	} else {
		async.parallel({
			yaowen: function(callback) {
				hmModel.yaowen(callback)
			},
			chanyeredian: function(callback) {
				hmModel.chanyeredian(callback)
			},
			hongguan: function(callback) {
				hmModel.hongguan(callback)
			},
			chanyeyuce: function(callback) {
				hmModel.chanyeyuce(callback)
			},
			chanyezhaoshang: function(callback) {
				hmModel.chanyezhaoshang(callback)
			},
			jinrong: function(callback) {
				hmModel.jinrong(callback)
			},
			chanyejihui: function(callback) {
				hmModel.chanyejihui(callback)
			},
			chanyegongsi: function(callback) {
				hmModel.chanyegongsi(callback)
			},
			chanyeyujing: function(callback) {
				hmModel.chanyeyujing(callback)
			},
			zhengquan: function(callback) {
				hmModel.zhengquan(callback)
			},
			zhengquancelue: function(callback) {
				hmModel.zhengquancelue(callback)
			},
			keji: function(callback) {
				hmModel.keji(callback)
			},
			shangye: function(callback) {
				hmModel.shangye(callback)
			},
			qiche: function(callback) {
				hmModel.qiche(callback)
			},
			shenghuo: function(callback) {
				hmModel.shenghuo(callback)
			}
		}, function(error, result) {
			cache.set('homeDataCache', result, 1000 * 60 * 5);
			callback(error, result);
		});
	}
};

exports.reportTree = function(callback) {
	var reportTree = cache.get('reportTree'),reportTreeArr,reportTreeChildClassDetailsArr;
	if(reportTree) {
		callback(null, _.cloneDeep(reportTree));
	} else {
		async.parallel([function(callacbk) {
			/*报告树所有栏目*/
			CacheClassServices.cacheReportsClass(callacbk)
		},function(callback){
			/*获取首页报告树中,子分类的报告数据*/
			hmModel.reportTreeChildClass(callback)
		}], function(error, result) {
			resultArr = result[0];
			reportTreeChildClassDetailsArr=result[1];
			//得到报告元素数据,组合成树结构,二维数组 reportTrees () 
			cache.set('reportTree', reportTrees(resultArr,reportTreeChildClassDetailsArr), 1000 * 60 * 10);
			callback(error, reportTrees(resultArr,reportTreeChildClassDetailsArr));
		});
	}
}

