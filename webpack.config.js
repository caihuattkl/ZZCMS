module.exports = {
	entry: {
		index: "./public/src/js/index.js",
	},
	output: {
		path: "public/dist",
		filename: "index.build.js"
	},
	module: {
		loaders: [{
			test: /\.css$/,
			loader: "style!css"
		}, {
			test: /\.html$/,
			loader: "html-loader"
		}, {
			test: /\.less$/,
			loader: 'style!css!less'
		}, {
			test: /\.(jpg|png)$/,
			loader: "url?limit=8192"
		}, {
			test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
			loader: 'url-loader?limit=50000&name=[path][name].[ext]'
		}]
	},
	resolve: {
		extensions: ['', '.js', '.jsx', '.html', '.css', '.less'],
		root: 'C:/Users/admin/Desktop/privateGit/express',
		alias: {
			vue: "public/lib/js/vue.js",
			header: 'views/adminViews/header.html',
			addNews:'views/adminViews/addNews.html',
			indexless: "public/src/less/index.less"
		}
	},
	plugins: []
};