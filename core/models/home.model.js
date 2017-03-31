var db = require("../../lib/db.lib.js");
var logger = require('../../lib/logger.lib');

//报告树子分类使用报告数据
exports.reportTreeChildClass = function(callback) {
	var sql = "select * from ( select r1.* from reports as r1 left join reports as r2 on r1.child_class = r2.child_class and r1.id >= r2.id group by r1.id having count(r1.id) <= 4) as c order by child_class desc";
	db.query(sql, function(err, rows) {
		if(err) {
			logger.database().error(__filename, err);
			return callback(err);
		}
		callback(null, rows)
	})
}

/*
 * 首页要闻
 */
exports.yaowen = function(callback) {
	var sql = "select id,subTitle,newsurl,time from news order by time desc limit 0,14"
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'yaowen the data is empty');
			return callback(err || 'yaowen the data is empty');
		}
		callback(null, rows)
	})
}
/*
 * 首页产业热点
 */
exports.chanyeredian = function(callback) {
	var sql = 'SELECT id,subTitle,newsurl,time from news where classChildId in (select id from news_class WHERE  id="69" or subTitle ="热点") order by time desc limit 0,8'
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'chanyeredian the data is empty');
			return callback(err || 'chanyeredian the data is empty');
		}
		callback(null, rows)
	})
}
/*
 * 首页产业预测
 */
exports.chanyeyuce = function(callback) {
	var sql = 'SELECT id,subTitle,newsurl,time from news where classChildId in (select id from news_class WHERE  id="67" or subTitle ="产业") order by time desc limit 0,5'
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'chanyeyuce the data is empty');
			return callback(err || 'chanyeyuce the data is empty');
		}
		callback(null, rows)
	})
}

/*
 * 首页产业招商
 */
exports.chanyezhaoshang = function(callback) {
	var sql = 'SELECT id,subTitle,newsurl,time from news where classChildId in (select id from news_class WHERE  id="72" or subTitle ="招商") order by time desc limit 0,8'
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'chanyezhaoshang the data is empty');
			return callback(err || 'chanyezhaoshang the data is empty');
		}
		callback(null, rows)
	})
}

/*
 * 首页产业公司
 */
exports.chanyegongsi = function(callback) {
	var sql = 'SELECT id,subTitle,newsurl,time from news where classChildId in (select id from news_class WHERE  id="66" or subTitle ="公司") order by time desc limit 0,8'
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'chanyegongsi the data is empty');
			return callback(err || 'chanyegongsi the data is empty');
		}
		callback(null, rows)
	})
}
/*
 * 首页产业预警
 */
exports.chanyeyujing = function(callback) {
	var sql = 'SELECT id,subTitle,newsurl,time from news where classChildId in (select id from news_class WHERE  id="68" or subTitle ="预警") order by time desc limit 0,4'
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'chanyeyujing the data is empty');
			return callback(err || 'chanyeyujing the data is empty');
		}
		callback(null, rows)
	})
}
/*
 * 首页宏观
 */
exports.hongguan = function(callback) {
	var sql = 'SELECT id,subTitle,newsurl,time from news where classFirstId in (select id from news_class WHERE  id="73" or subTitle ="宏观") order by time desc limit 0,14'
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'hongguan the data is empty');
			return callback(err || 'hongguan the data is empty');
		}
		callback(null, rows)
	})
}




/*
 * 首页金融
 */
exports.jinrong = function(callback) {
	var sql = 'SELECT id,subTitle,newsurl,time from news where classFirstId in (select id from news_class WHERE subTitle ="金融") order by time desc limit 0,13'
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'jinrong the data is empty');
			return callback(err || 'jinrong the data is empty');
		}
		callback(null, rows)
	})
}

/*
 * 首页产业-机会
 */
exports.chanyejihui = function(callback) {
	var sql = 'SELECT id,subTitle,newsurl,time from news where classChildId in (select id from news_class WHERE subTitle ="机会" or id ="71") order by time desc limit 0,4'
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'chanyejihui the data is empty');
			return callback(err || 'chanyejihui the data is empty');
		}
		callback(null, rows)
	})
}

/*
 * 首页证券
 */
exports.zhengquan = function(callback) {
	var sql = 'SELECT id,subTitle,newsurl,time from news where classFirstId in (select id from news_class WHERE subTitle ="证券" or id ="4") order by time desc limit 0,14'
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'zhengquan the data is empty');
			return callback(err || 'zhengquan the data is empty');
		}
		callback(null, rows)
	})
}

/*
 * 首页证券策略
 */
exports.zhengquancelue = function(callback) {
	var sql = 'SELECT id,subTitle,newsurl,time from news where classChildId in (select id from news_class WHERE subTitle ="策略" or id ="4") order by time desc limit 0,7'
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'zhengquancelue the data is empty');
			return callback(err || 'zhengquancelue the data is empty');
		}
		callback(null, rows)
	})
}

/*
 * 首页科技
 */
exports.keji = function(callback) {
	var sql = 'SELECT id,subTitle,newsurl,time from news where classFirstId in (select id from news_class WHERE subTitle ="科技" or id ="55") order by time desc limit 0,14'
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'keji the data is empty');
			return callback(err || 'keji the data is empty');
		}
		callback(null, rows)
	})
}


/*
 * 首页商业
 */
exports.shangye = function(callback) {
	var sql = 'SELECT id,subTitle,newsurl,time from news where classFirstId in (select id from news_class WHERE subTitle ="商业" or id ="31") order by time desc limit 0,14'
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'shangye the data is empty');
			return callback(err || 'shangye the data is empty');
		}
		callback(null, rows)
	})
}

/*
 * 首页汽车
 */
exports.qiche = function(callback) {
	var sql = 'SELECT id,subTitle,newsurl,time from news where classFirstId in (select id from news_class WHERE  id="2" or subTitle ="汽车") order by time desc limit 0,14'
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'qiche the data is empty');
			return callback(err || 'qiche the data is empty');
		}
		callback(null, rows)
	})
}

/*
 * 首页生活
 */
exports.shenghuo = function(callback) {
	var sql = 'SELECT id,subTitle,newsurl,time from news where classFirstId in (select id from news_class WHERE  id="82" or subTitle ="生活") order by time desc limit 0,13'
	db.query(sql, function(err, rows) {
		if(err || !rows.length) {
			logger.database().error(__filename, err || 'shenghuo the data is empty');
			return callback(err || 'shenghuo the data is empty');
		}
		callback(null, rows)
	})
}

