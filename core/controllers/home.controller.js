var filter = require("../../lib/filter.lib");
var homeSev = require("../services/home.service");
var async = require('async');
var CacheAds = require("../services/CacheAds.service");
var adsMod= require("../models/ads.model");
var logger = require('../../lib/logger.lib');
//首页渲染

exports.home = function(req, res, next) {
	async.parallel({
		reportTree: function(callback) {
			homeSev.reportTree(callback)
		},
		homeClassList: function(callback) {
			homeSev.homeClassList(callback)
		},
		homeAds:function(callback){
			CacheAds.ads(callback)
		},
		homeHeadlines:function(callback){
			adsMod.headlinesDetail(callback)
		},
	}, function(error, allData) {
		if(error){return res.status(500).end('500 - Server Error')}
		res.render('template/index', {  
			reportTree:allData.reportTree,
			yaowen: allData.homeClassList.yaowen,
			chanyeredian: allData.homeClassList.chanyeredian,
			hongguan: allData.homeClassList.hongguan,
			chanyeyuce: allData.homeClassList.chanyeyuce, 
			chanyezhaoshang: allData.homeClassList.chanyezhaoshang,
			chanyegongsi: allData.homeClassList.chanyegongsi,
			jinrong: allData.homeClassList.jinrong,
			chanyejihui: allData.homeClassList.chanyejihui,
			zhengquan: allData.homeClassList.zhengquan,
			zhengquancelue: allData.homeClassList.zhengquancelue,
			keji: allData.homeClassList.keji,
			shangye: allData.homeClassList.shangye,
			qiche: allData.homeClassList.qiche,
			shenghuo: allData.homeClassList.shenghuo, 
			chanyeyujing: allData.homeClassList.chanyeyujing,
			ads_exclusiveData:allData.homeAds.screeningAd("HM01"),
			ads_summitMeeting:allData.homeAds.screeningAd("HM02"),
			ads_attractInvestment:allData.homeAds.screeningAd("HM03"),
			ads_company:allData.homeAds.screeningAd("HM04"),
			ads_hotspot:allData.homeAds.screeningAd("HM05"),
			ads_tipster:allData.homeAds.screeningAd("HM06"),
			homeHeadlines:allData.homeHeadlines[0].news.split(",")
		})
	});
};