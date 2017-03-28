$(function() {
	autoPlay()
	isIe(8) || isIe(7) || isIe(6) ? $("body").empty() && alert("本站不支持IE8及以下浏览器访问,请更新至IE9内核浏览器或chrome,火狐浏览器!") : "";
	$("#section-left>ul>li").on({ mouseenter: function(e) { $(this).children("#sectionSubContent").show() }, mouseleave: function(e) { $(this).children("#sectionSubContent").hide() } });
	$("#ph li h4").hover(function() {
		$("#ph li h4").attr("class", "");
		$(this).attr("class", "current");
		$(this).text() == "月排行" ? $("#newsListMonth").removeAttr("style") && $("#newsListWeek").attr("style", "display: none;") : $("#newsListWeek").removeAttr("style") && $("#newsListMonth").attr("style", "display: none;")
	}, null);
	$("#hotKey>a").each(function(i, v) { $(v).attr("style", "color:" + "#" + (Math.random() * 16777215 << 0).toString(16) + ";font-size:" + Math.floor(Math.random() * (28 - 12 + 1) + 12) + "px") })
});

var isIe = function(ver) {
	var b = document.createElement("b");
	b.innerHTML = "<!--[if IE " + ver + "]><i></i><![endif]-->";
	return b.getElementsByTagName("i").length === 1
};

var autoPlay = function() {
	var pictures = $("#pictures");
	var items = $("#pictures li");
	var newTitle = $("#bannerText .text");
	var jump = $("#jump span");
	var pre = $("#pre");
	var next = $("#next");
	var index = -1;
	var ctrl = null;

	function showItem(turn) {
		items.attr("style", "opacity:0;");
		if(turn) {
			index--;
			index < 0 && (index = items.length - 1)
		} else {
			index++ && index > items.length - 1 && (index = 0)
		}
		$(items[index]).attr("style", "opacity:1;");
		newTitle.text($("#pictures li a img").eq(index).attr("alt"))
	}
	
	
	ctrl = setInterval(showItem, 2000);
	pictures.add(pre).add(next).add(jump).mouseover(function() {
		clearInterval(ctrl)
	}).mouseout(function() {
		ctrl = setInterval(showItem, 2000)
	});
	pre.click(function() {
		showItem(true)
	});
	next.click(function() {
		howItem(false)
	});
	
	jump.mouseover(function(e) {
		showItem(index = $(this).index() + 1)
	})
	
}