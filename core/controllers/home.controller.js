var hmSev=require("../services/home.service");


//首页渲染
exports.home = function(req, res, next) {
	hmSev(function(err,allData){
		if(!err){
			res.render('template/index', {
				yaowen:allData.yaowen,
				chanyeredian:allData.chanyeredian,
				hongguan:allData.hongguan,
				chanyeyuce:allData.chanyeyuce,
				chanyezhaoshang:allData.chanyezhaoshang,
				chanyegongsi:allData.chanyegongsi,
				jinrong:allData.jinrong,
				chanyejihui:allData.chanyejihui,
				zhengquan:allData.zhengquan,
				zhengquancelue:allData.zhengquancelue,
				keji:allData.keji,
				shangye:allData.shangye,
				qiche:allData.qiche,
				shenghuo:allData.shenghuo,
				chanyeyujing:allData.chanyeyujing,
			})
		}
	})
};
