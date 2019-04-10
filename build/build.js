// 用于构建生产环境, 通过 Node 调用 Webpack 进行打包
const webpack = require('webpack');
const config = require('./webpack.prod.conf');

webpack(config, (err, stats) => {
  if( err || stats.hasErrors()) {
    // 处理错误
    console.error(err);
    return;
  }
  // 处理完成
  console.log(stats.toString({
    chunks: false,  // 使构建过程更静默无输出
    colors: true    // 在控制台展示颜色
  }))
});
