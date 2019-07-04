// source-map
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin'); 
const path = require('path');
const baseConfig = require('./webpack.base.conf');
const ExtractTextPlugin = require('extract-text-webpack-plugin') //css在dist目录下需要和我们的HTML分离

module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test:/\.(less)$/,
        use:ExtractTextPlugin.extract({
          use:['vue-style-loader', 'css-loader','less-loader']
        })
      }
    ], 
  },
  
  plugins: [
    new CleanWebpackPlugin(),
    new ExtractTextPlugin( {
      filename: '../dist/css/[name].css'// 从 .js 文件中提取出来的 .css 文件的名称
    }),  
  ]
})