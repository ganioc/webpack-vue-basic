const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin")

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

						'less': [
							'vue-style-loader',
							'css-loader',
							'less-loader'
						]
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
	}
}


if (process.env.NODE_ENV === 'production') {
	module.exports.plugins = (module.exports.plugins || []).concat([
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		})
	])
}