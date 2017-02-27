KindEditor.plugin('reportFormat', function(K) {
	// 点击图标时执行  
	this.clickToolbar('reportFormat', function() {
		//		this.insertHtml('[I1111111111111111>] ');
		if(this.html()==''||this.html()=='undefined'){
			return alert("没有内容,无法格式化哦!")
		}
		var html = this.html();
		html = html.replace(/<.[^>]*>/gm, '');
		html = html.replace(/^(.+)([。|”|\.|\S])/gm, '<p>$1$2</p>');
		html = html.replace(/<p>(第.{1,3}章.+?)<\/p>/gm,"<p><strong class='stg'>$1<\/strong><\/p>");
		html = html.replace(/<p>(第.{1,3}节.+?)<\/p>/gm,"<p>　　$1<\/p>")
		html = html.replace(/<p>([一二三四五六七八九十]+.+?)<\/p>/gm,"<p>　　　　$1<\/p>")
		html = html.replace(/<p>([0-9|.|、|（）]+.+?)<\/p>/gm,"<p>　　　　　　$1<\/p>")
		this.html("");
		this.html(html);
	});
});