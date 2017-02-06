var exphbs = require('express-hbs');
exphbs.registerHelper('if_index', function(v1, v2, opt) {
	if(v1 > v2) {
		//满足添加继续执行
		return opt.fn(this);
	} else {
		return opt.inverse(this);
	}
});

exphbs.registerHelper('if_index_list', function(v1, v2, opt) {
	if(v1 > v2) {
		//满足添加继续执行
		return opt.inverse(this);

	} else {
		return opt.fn(this);
	}
});

//判断频道页的幻灯片
exphbs.registerHelper('if_channelSlide', function(v1, opt) {
	if(v1 && v1 != '汽车' && v1 != '金融' && v1 != '证券' && v1 != '生活' && v1 != '科技') {
		return opt.inverse(this);
	} else {
		return opt.fn(this);
	}
});
exphbs.registerHelper('if_channelSlideIn', function(v1, v2,opt) {
	if(v1 == v2) {
		return opt.fn(this);
	} else {
		return opt.inverse(this);
	}
});

//频道新闻
exphbs.registerHelper('if_newsDetails', function(v1, v2, opt) {
	if(v1 == v2) {
		return opt.fn(this);
	}
});

//频道新闻
exphbs.registerHelper('nContentStr', function(v1, v2, opt) {
	return this.nContent.replace(/<[^>]+>|\s/g, "").substr(0, 100)
});

//频道业务代码js
exphbs.registerHelper('if_businessCode', function(v1, opt) {
	if(v1 == '证券') {
		return '<script src="../src/js/zhengquan.js"></script>'
	} else if(v1 == '金融') {
		return '<script src="../src/js/jinrong.js"></script>'
	} else if(v1 == '生活') {
		return '<script src="../src/js/life.js"></script>'
	}  else if(v1 == '科技') {
		return '<script src="../src/js/keji.js"></script>'
	} else {
		return;
	}
});

//内容页翻页,下一页
exphbs.registerHelper('nextPageHlp', function(currentPage, newsUrl, countPage, opt) {
	if(currentPage >= countPage) {
		currentPage = countPage - 1;
	}
	return newsUrl.split('.html')[0] + '-' + (parseInt(currentPage) + 1) + '.html'
});

exphbs.registerHelper('prePageHlp', function(currentPage, newsUrl, countPage, opt) {
	return newsUrl.split('.html')[0] + '-' + (currentPage - 1 == 0 ? 1 : currentPage - 1) + '.html'
});

exphbs.registerHelper('currentCss', function(v1, v2, opt) {
	//	console.log(v1,v2)
	if(v1 == v2) {
		return 'class="paginationColor"';
	}
});

exphbs.registerHelper('ifPaging', function(v1, opt) {
	if(v1 > 1) {
		return opt.fn(this);
	}
});