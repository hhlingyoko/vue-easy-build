// 开发环境
const merge = require('webpack-merge');
const path = require('path');
const baseConfig = require('./webpack.base.conf');
const webpack = require('webpack');
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'eval ', // 控制是否生成，以及如何生成 source map。 详细请看https://www.webpackjs.com/configuration/devtool/
  devServer: { // 如果你通过 Node.js API 来使用 dev-server， devServer 中的选项将被忽略。
    contentBase: path.resolve(__dirname, '../dist'),
    port: '8011',
    open: true,
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin() // css 热更新
  ],

})