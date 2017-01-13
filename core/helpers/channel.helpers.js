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
exphbs.registerHelper('if_channelSlide', function(v1, v2, opt) {
	if(v1==v2){
		return opt.fn(this);
	}else{
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
	return this.nContent.replace(/<[^>]+>|\s/g,"").substr(0,100)
});

//exphbs.registerHelper('conNavHlp', function(v1, v2, opt) {
//	console.log(this)
//});

