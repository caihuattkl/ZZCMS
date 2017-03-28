KindEditor.plugin('paging', function(K) {
	// 点击图标时执行  
	this.clickToolbar('paging', function() {
		this.insertHtml('{{paging}}');
	});
});