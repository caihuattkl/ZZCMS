KindEditor.plugin('diyFormat', function(K) {
	// 点击图标时执行  
	this.clickToolbar('diyFormat', function() {
		if(this.html()==''||this.html()=='undefined'){
			return alert("内容为空无法格式化!")
		}
		var html = this.html();
//		html = html.replace(/<.[^>]*>/g, '');
		html = html.replace(/<p>([\s]+)?/gm, '<p>　　')
		this.html(html);
	});
});