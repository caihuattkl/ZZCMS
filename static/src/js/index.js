//首页左侧导航树
$('#section-left>ul>li').on({
	mouseenter: function(e) {
		$(this).children("#sectionSubContent").show();
	},
	mouseleave: function(e) { 
		$(this).children("#sectionSubContent").hide();
	}
});






$(function(){
	//判断是否是ie8及以下版本
	isIe(8)?$('body').empty()&&alert("本站不支持IE8及其以下浏览器访问,请更新至IE9或chome,火狐浏览器!"):'';
})