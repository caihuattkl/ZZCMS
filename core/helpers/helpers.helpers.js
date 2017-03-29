var exphbs = require('express-hbs');


//首页报告树分隔符
exphbs.registerHelper('reportTreeSeparator', function(v1,opt) {
	if(v1==0){
		v1='';
	}else if(v1==1){
		v1='、';
	}else if(v1>=2){
		v1='';
	}
	return v1; 
}); 
//首页报告树过滤字符,只显示2-3个
exphbs.registerHelper('reportTreeFilterCharacter', function(v1,opt) {
	if(v1>=2){
		return '';
	}
	return opt.fn(this);
});

exphbs.registerHelper('reportTreeChildClassCompare', function(v1,opt) {
	if(v1.frist_class==0){
		return opt.fn(this);
	}else{
		return opt.inverse(this);
	}
})

//报告列表页menu裁剪
exphbs.registerHelper('forStr', function(v1,opt) {
	if(v1=='医疗医药保健')return '医药';
	if(v1=='交通物流')return '交运';
	if(v1=='食品产业')return '食品';
	if(v1=='旅游酒店餐饮')return '旅游';
	if(v1=='商务贸易')return '商贸';
	if(v1=='农林牧渔')return '农业';
	if(v1=='房地产')return '地产';
	if(v1=='化工日化')return '日化';
	if(v1=='建材冶金')return '建材';
	if(v1=='轻工业')return '轻工';
	return v1;
});


exphbs.registerHelper('forStrColor', function(v1,v2,opt) {
	return v2.replace(eval('/('+v1+')/'),'<span style="color:#225d98;">$1</span>');
	
});

//频道头条设置
exphbs.registerHelper('ifTop', function(v1, v2, opt) {
	if(v1 > v2) {
		//满足添加继续执行
		return opt.fn(this);
	} else {
		return opt.inverse(this);
	}
});


//频道头条在实时新闻中排除掉
exphbs.registerHelper('ifRemoveTop', function(v1, v2, opt) {
	if(v1 > v2) {
		//满足添加继续执行
		return opt.inverse(this);

	} else {
		return opt.fn(this);
	}
});

//判断频道页的幻灯片
exphbs.registerHelper('if_channelSlide', function(v1, opt) {
	if(v1&& v1 != '商业'&& v1 != '产业'&& v1 != '宏观' && v1 != '汽车' && v1 != '金融' && v1 != '证券' && v1 != '生活' && v1 != '科技') {
		return opt.inverse(this);
	} else {
		return opt.fn(this);
	}
});
exphbs.registerHelper('if_channelSlideIn', function(v1, v2, opt) {
	if(v1 == v2) {
		return opt.fn(this);
	} else {
		return opt.inverse(this);
	}
});

//频道栏目,根据栏目id 对比分发新闻
exphbs.registerHelper('if_newsDetails', function(v1, v2, opt) {
	if(v1 == v2) {
		return opt.fn(this);
	}
});

//栏目页新闻列表 摘要信息处理
exphbs.registerHelper('classNewsDescription', function(v1, v2, opt) {
	return this.nContent.replace(/<[^>]+>|\s/g, "").substr(0, 100)
});

//频道业务代码js
exphbs.registerHelper('if_businessCode', function(v1, opt) {
	if(v1 == '证券') {
		return '<script src="../dist/js/zhengquan.js"></script>'
	} else if(v1 == '金融') {
		return '<script src="../dist/js/jinrong.js"></script>'
	} else if(v1 == '生活') {
		return '<script src="../dist/js/life.js"></script>'
	}else if(v1 == '汽车') {
		return '<script src="../dist/js/other.js"></script>'
	}else if(v1 == '商业') {
		return '<script src="../dist/js/other.js"></script>'
	}else if(v1 == '宏观') {
		return '<script src="../dist/js/other.js"></script>'
	}else if(v1 == '产业') {
		return '<script src="../dist/js/other.js"></script>'
	} else if(v1 == '科技') {
		return '<script src="../dist/js/keji.js"></script>'
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

//栏目也列表分页
//exphbs.registerHelper('classPageSize', function(items,frist,child,id,opt) {
//	var out='',pageCss;
//for(var i=0, l=Math.ceil(items/10); i<l; i++) {
//	pageCss=(i+1)?"paginationColor":"";
//  out += '<li><a href="/'+frist+'/'+child+'/'+id+'/'+(i+1)+'" class="'+pageCss+'" onclick="fn(this)">' + (i+1)+ '</a></li>'
//}
//return out;
//});

//栏目页列表分页点击样式helps
exphbs.registerHelper('classCurCss', function(curPage,thisArr,opt) {
	if(curPage == thisArr) {
		return 'class="paginationColor"';
	}
});
exphbs.registerHelper('classPrePage', function(val,arr,opt) {
	var v=val-1;
	if(v<=arr.length){
		v=1
	}
	return v;
});
exphbs.registerHelper('classNextPage', function(val,arr,opt) {
	let v=parseInt(val)+1;
	if(v>=arr.length){
		v=arr.length
	}
	return v;
});
