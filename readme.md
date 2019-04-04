## 基于vue+webpack的项目搭建
### 1. 创建模块
`npm init `
### 2. 安装webpack。（ -D是 --save-dev的简写）
   生成 package-lock.json文件， 用于锁定安装时的包的版本号，并且需要上传到git，以保证其他人在npm install时大家的依赖能保证一致。
`npm install webpack webpack-cli -D`
### 3. 安装loader （css-loader：用于读取css文件， style-loader：用于将样式插入到页面中）
`npm install css-loader style-loader -D`

