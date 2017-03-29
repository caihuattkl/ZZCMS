KindEditor.ready(function(ke) {
	//新闻编辑器
	window.editor = ke.create('#editor_1', {
		filterMode: true,
		width: '100%',
		items: [
			'source', 'bold', 'fontname', 'fontsize', 'forecolor', 'plainpaste', '|', 'diyFormat', 'paging'
		]
	});
	//报告编辑器
	window.editor2 = ke.create('#reportEdit', {
		filterMode: true,
		width: '100%',
		items: [
			'source', 'plainpaste', '|', 'reportFormat'
		]
	});
	//信息库编辑提交 编辑器
	window.inforepertoryEditor = ke.create('#inforepertoryEditor', {
		filterMode: true,
		width: '100%',
		items: [
			'source', 'bold', 'fontname', 'fontsize', 'forecolor', '|', 'diyFormat', 'paging'
		]
	});
});

KindEditor.lang({
	diyFormat: '自定义排版功能',
	reportFormat: "报告目录排版(章节排版模式)",
	paging: "分页符",
});