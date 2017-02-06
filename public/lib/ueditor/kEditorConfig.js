//加载编辑器
KindEditor.ready(function(ke) {
	window.editor = ke.create('#editor_1,##editor_2', {
		filterMode: true,
		width: '100%',
		items: [
			'source', 'bold', 'fontname', 'fontsize', 'forecolor', '|', 'diyFormat'
		]
	});
});

KindEditor.lang({
	diyFormat: '自定义排版功能'
});