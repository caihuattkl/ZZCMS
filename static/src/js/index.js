//首页左侧导航树
$('#section-left>ul>li').on({
	mouseenter: function(e) {
		$(this).children("#sectionSubContent").show();
	},
	mouseleave: function(e) {
		$(this).children("#sectionSubContent").hide();
	} 
});

function autoPlay() {
	var pictures = $("#pictures");
	var items = $("#pictures li");
	var newTitle= $("#bannerText .text")
	var jump = $("#jump span");
	var pre = $("#pre");
	var next = $("#next");
	var index = -1;
	var ctrl = null;

	// 显示一张图片
	function showItem(turn) {
		// 首先将所有图片透明度设为0
		items.attr("style", "opacity:0;")

		//判断点击上一页还是下一页
		if(turn) {
			index--;
			index < 0 && (index = items.length - 1);
		} else {
			index++ && index > items.length - 1 && (index = 0);
		}
		
		$(items[index]).attr("style", "opacity:1;");
		//图片标题文字
		newTitle.text($("#pictures li a img").eq(index).attr("alt"));

	}

	ctrl = setInterval(showItem, 2000);
	//移入时清除滚动
	pictures.add(pre).add(next).add(jump).mouseover(function() {
		clearInterval(ctrl)
	}).mouseout(function() {
		ctrl = setInterval(showItem, 2000);
	})

	//图片上下翻页
	pre.click(function() {
		showItem(true); //上一张
	})

	next.click(function() {
			showItem(false);
	})
	//根据数字编号进入某张图
	jump.mouseover(function(e) {
		showItem(index=$(this).index()+1);
	})

};

$(function() {
	//判断是否是ie8及以下版本
	isIe(8) || isIe(7) || isIe(6)  ? $('body').empty() && alert("本站不支持IE8及其以下浏览器访问,请更新至IE9或chome,火狐浏览器!") : '';
	//首页图片轮播
	autoPlay(); 
})

