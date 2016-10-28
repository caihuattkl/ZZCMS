//图片轮播
var autoPlay = (function() {
		var pictures = $("#pictures");
		var items = $("#pictures li");
		var newTitle = $("#bannerText .text")
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
			showItem(index = $(this).index() + 1);
		})

	}
());

$(function() {
	//alert("1")
	//判断是否是ie8及以下版本
	isIe(8) || isIe(7) || isIe(6) ? $('body').empty() && alert("本站不支持IE8及以下浏览器访问,请更新至IE9内核浏览器或chrome,火狐浏览器!") : '';

	//首页左侧导航树
	$('#section-left>ul>li').on({
		mouseenter: function(e) {
			$(this).children("#sectionSubContent").show();
		},
		mouseleave: function(e) {
			$(this).children("#sectionSubContent").hide();
		}
	});
	//周排行,月排行滑动
	$("#ph li h4").hover(function(){
		$("#ph li h4").attr("class","");
		$(this).attr("class","current");
		$(this).text()=='月排行'?
		$("#newsListMonth").removeAttr("style")&&$("#newsListWeek").attr("style","display: none;"):
		$("#newsListWeek").removeAttr("style")&&$("#newsListMonth").attr("style","display: none;");
	},null)
	//标签云,随机获取颜色
	$("#hotKey>a").each(function(i,v){
		$(v).attr("style","color:"+'#'+(Math.random()*0xffffff<<0).toString(16)+";font-size:"+Math.floor(Math.random()*(28-12+1)+12)+"px")
	})
})