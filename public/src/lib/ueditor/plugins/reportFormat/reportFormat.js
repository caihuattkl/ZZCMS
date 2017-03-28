KindEditor.plugin('reportFormat', function(K) {
	// 点击图标时执行  
	this.clickToolbar('reportFormat', function() {
		if(this.html() == '' || this.html() == 'undefined') {
			return alert("没有内容,无法格式化哦!")
		}
		var html = this.html();
		//复位初始化
		html = html.replace(/<p>([\s]+)?/gm, '<p>');
		var off = html.match(/<p>第[1|一]章.+?<\/p><p>([0-9][.][0-9]?)/)
		if(off && off[1]) {
			html = html.replace(/<p>(第.{1,3}章.+?)<\/p>/gm, "<p><strong class='stg'>$1<\/strong><\/p>");
			html = html.replace(/<p>([0-9]+.[0-9+])\s+/gm, "<p>　　$1　");
			html = html.replace(/<p>([0-9]+.[0-9]+.[0-9]+)\s+/gm, "<p>　　　　$1　");
			html = html.replace(/<p>([0-9]+.[0-9]+.[0-9]+.[0-9]+)\s+/gm, "<p>　　　　　　$1　");
			this.html("");
			this.html(html);
		} else {
			html = html.replace(/<p><br.+>/gm, '').replace(/(<.>)\s+/gm, "<p>");
			html = html.replace(/<p>(第.{1,3}章.+?)<\/p>/gm, "<p><strong class='stg'>$1<\/strong><\/p>");
			html = html.replace(/<p>(第.{1,3}节.+?)<\/p>/gm, "<p>　　$1<\/p>")
			html = html.replace(/<p>([一二三四五六七八九十]+.+?)<\/p>/gm, "<p>　　　　$1<\/p>")
			html = html.replace(/<p>([0-9|.|、|（）]+.+?)<\/p>/gm, "<p>　　　　　　$1<\/p>")
			this.html("");
			this.html(html);
		}
	});
});