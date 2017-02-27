//加载编辑器
KindEditor.ready(function(ke) {
	window.editor = ke.create('#editor_1,#editor_2', {
		filterMode: true,
		width: '100%',
		items: [
			'source', 'bold', 'fontname', 'fontsize', 'forecolor', '|', 'diyFormat'
		]
	});
	
	window.editor2 = ke.create('#reportEdit', {
		filterMode: true,
		width: '100%',
		items: [
			'source','|','reportFormat'
		]
	});
	
});

KindEditor.lang({
	diyFormat: '自定义排版功能',
	reportFormat:"报告目录排版(章节排版模式)"
});
