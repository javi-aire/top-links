'use strict'
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const parts = require('./webpack.parts');
// const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// new MiniCssExtractPlugin('bundle-[hash].css'),


module.exports = {
	entry: `${__dirname}/server/app.js`,
	output: {
		// filename: 'bundle-[hash].js',
		path: `${__dirname}/build`,
		publicPath: '/'
	},
	plugins: [
		new HtmlWebpackPlugin({
      title: 'Top Links App',
      filename: 'index.html'
    }),
	],
	devServer: {
		stats: 'errors-only',
		host: process.env.HOST,
		port: process.env.PORT,
		open: true,
		overlay: true
	},
	resolveLoader: {
		modules: ['node_modules'],
		extensions: ['.js', '.json'],
		mainFields: ['loader', 'main']
	}
};