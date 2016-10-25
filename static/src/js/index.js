//首页左侧导航树
$('#section-left>ul>li').on({
	mouseenter: function(e) {
		$(this).children("#sectionSubContent").show();
	},
	mouseleave: function(e) {
		$(this).children("#sectionSubContent").hide();
	}
});

//首页图片轮播
$(function() {
	var pics = [{
		url: '../images/banner-1.jpg',
		link: '#1',
		time: 5000
	}, {
		url: '../images/banner-2.jpg',
		link: '#2',
		time: 4000
	}, {
		url: '../images/banner-3.jpg',
		link: '#3',
		time: 6000
	}, {
		url: '../images/banner-4.jpg',
		link: '#4',
		time: 6000
	}];
	
	function solidBanner(){
		$("#bannerBox ul li a").each(function(i,v){
		var step=1;
		if(step==1 && i==0){
			$(this).children("img").attr('src',pics[i].url);
		}else{
			$(this).children("img").attr('src',pics[i].url);
			$(this).attr("style","display: none;")
		}
	})
	}
	
	setInterval(function(){
		console.log("a");
	},3000)
	
	
})


$(function() {
	//判断是否是ie8及以下版本
	isIe(8) ? $('body').empty() && alert("本站不支持IE8及其以下浏览器访问,请更新至IE9或chome,火狐浏览器!") : '';
})