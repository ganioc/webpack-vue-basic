const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


module.exports = {
	entry: './src/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: "js/[name].js"

	},
	devServer: {
		contentBase: "./dist"
	},
	plugins: [
		// make sure to include the plugin for the magic
		new VueLoaderPlugin(),
		new HtmlWebpackPlugin({
			filename: 'index.html',
			title: 'vue demo',
			template: './index.html'
		}),
		new ExtractTextPlugin({ filename: 'styles/root.css', allChunks: false }),
		new ExtractTextPlugin({ filename: 'styles/[name]/style.css', allChunks: true }),
		new webpack.HotModuleReplacementPlugin(),
	],
	module: {
		rules: [
			{
				test: /\.js$/, // requrie, import js file
				loader: "babel-loader", // compiler
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],

			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				loader: 'file-loader',
				options: {
					esModule: false,
					limit: 10000,
					name: 'img/[name].[ext]?[hash]'
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: 'fonts/[name].[ext]?[hash]'
				}
			},
			{
				test: /\.less$/,
				use: [
					'vue-style-loader',
					'css-loader',
					'less-loader'
				]
			},
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: {
					loaders: {
						'css': ExtractTextPlugin.extract({
							use: 'css-loader',
							fallback: 'vue-style-loader'
						}),
						'less': ExtractTextPlugin.extract({
							use: [
								'css-loader',
								'less-loader'
							],
							fallback: 'vue-style-loader',
						})
					}
				}
			},

		]
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': path.resolve(__dirname, './src'),
		}
	},
	externals: {
		'jquery': 'window.jQuery'
	},
	optimization: {
		splitChunks: {
			// include all types of chunks
			chunks: 'all',
			minSize: 0, // 最小尺寸，默认0
			minChunks: 1, // 最小 chunk ，默认1
			maxAsyncRequests: 1, // 最大异步请求数， 默认1
			maxInitialRequests: 1, // 最大初始化请求书，默认1
			name: function () {
			}, // 名称，此选项可接收 function
			cacheGroups: { // 这里开始设置缓存的 chunks

			}
		},
		minimizer: [new UglifyJsPlugin()],
	},
	devtool: '#eval-source-map',
}


if (process.env.NODE_ENV === 'production') {
	module.exports.devtool = '#source-map'

	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),

	])
}