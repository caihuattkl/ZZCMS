KindEditor.plugin('diyFormat', function(K) {
	// 点击图标时执行  
	this.clickToolbar('diyFormat', function() {
		//		this.insertHtml('[I1111111111111111>] ');
		if(this.html()==''||this.html()=='undefined'){
			return alert("内容为空无法格式化!")
		}
		var html = this.html();
		html = html.replace(/<.[^>]*>/g, '');
		html = html.replace(/^(.+)([。|”|\.|\S])\s/gm, '<p>$1$2</p>')
		html = html.replace(/<p>([|\s]+)/gm, '<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
		this.html("");
		this.html(html);
	});
});