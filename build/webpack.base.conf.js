// 基础打包配置
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // html打包
const AutoDllPlugin = require('autodll-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin') //css在dist目录下需要和我们的HTML分离

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, '../src/index.js'), // path.resolve() 方法会把一个路径或路径片段的序列解析为一个绝对路径。 
  },
  output: {
    path: path.resolve(__dirname, '../dist'), // __dirname 获取当前模块文件所在目录的完整绝对路径
    filename: '[name].[hash:8].js'       
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test:  /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000
            }
          }
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test:/\.(less)$/,
        use:['vue-style-loader', 'css-loader','less-loader', 'postcss-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.json', '.vue'], // 省略后缀
    alias: {
      'vue$': 'vue/dist/vue.min.js',
      '@': path.resolve(__dirname,'../src'),
    }
  },
  plugins: [
    // new ExtractTextPlugin( {
    //   filename: '../dist/css/style.css'// 从 .js 文件中提取出来的 .css 文件的名称
    // }),  
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html')
    }),
  ]
};