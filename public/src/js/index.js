$(function() {
	//菜单收展
	$(".clickSide").on("click", function() {
			if(!$("#nav").attr("style")) {
				$("#nav").attr("style", "width:0px;")
				$(".article").attr("style", "margin-left:0px;")
			} else {
				$("#nav").removeAttr("style")
				$(".article").attr("style")
			}
		})
		//高度自适应
	$("#nav,.clickSide,.article").attr("style", "height:" + ($(document).height() - 75) + "px");

	getNewsClassList();

})

function getNewsClassList() {
	//获取左侧树新闻栏目
	var html = "";
	$.get(ajaxConfig.newsClassList, function(res) {
		if(res.data.length != 0 && res.code == 200) {
			res.data.forEach(function(val, index) {
				html += '<li id="' + 'firstId' + val.id + '"><a href="/#' + val.id + '" target="main"  data-toggle="collapse"> ' + val.subTitle + '</a>';
				if(val.child.length != 0) {
					var children = '<ul id="' + val.id + '">';
					val.child.forEach(function(v, i) {
						children += '<li><a href="./newsList?newsClassId=' + v.id + '" target="main"> ' + v.subTitle + '</a> | <a href="./addNews?classChildId=' + v.id + '&&classFirstId=' + val.id + '" target="main">添加</a></li>';
					})
					children += '</ul>'
				}else{
					var children = '<ul id="' + val.id + '"><li>没有子分类!</li></ul>';
				}
				html += children + "</li>";

			})
			$("#navNewsClass").empty().append(html);
		}
	})

}