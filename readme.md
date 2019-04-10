## 基于vue+webpack的项目搭建
#### 1. 创建模块
`npm init `
#### 2. 安装webpack。（ ）
生成 package-lock.json文件， 用于锁定安装时的包的版本号，并且需要上传到git，以保证其他人在npm install时大家的依赖能保证一致。
`npm install webpack webpack-cli -D // -D是 --save-dev的简写`
#### 3. 安装loader 
css-loader：用于读取css文件， style-loader：用于将样式插入到页面中
`npm install css-loader style-loader -D`

#### 4. 配置Webpack
新建`build`文件夹，把Webpack 配置相关的文件放在此目录下。

进入`build`目录，创建三个文件，并写入配置：
- webpack.base.conf.js // 基础配置
- webpack.dev.conf.js  
- webpack.prod.conf.js
- build.js   // 用于构建生产环境,通过 Node 调用 Webpack 进行打包

注意：配置内引入了`webpack-merge ` `clean-webpack-plugin` `webpack-dev-server` `html-webpack-plugin` 这些新的依赖，需先安装
```
cnpm i webpack-merge clean-webpack-plugin webpack-dev-server html-webpack-plugin -D

```

在`package.json`文件的`scripts`属性中，写入：
```
  "build": "node build/build.js",
  "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js
```

在`src`目录下新建文件`index.js`,写入代码进行测试:
```
  var h2= document.createElement("h2")
  h2.innerHTML="打包程序成功";
  document.body.appendChild(h2);
```
输入`npm run dev` , 在自动打开的网页中显示 打包程序成功。

然后 输入 `npm run build`, 在`dist`目录下会出现`js`和`map`文件

至此，基础的打包功能已完成。下面我们要对项目进行扩充，使它的功能更强大。

#### 4. 引入基础loader
- 安装`babel-loader` 和 转义器包`stage-2`

> webpack 4.x | babel-loader 7.x | babel 6.x
```
cnpm i babel-loader@7 babel-core babel-preset-env babel-preset-stage-2 -D
```


在 `webpack.base.conf.js` 的`module.rules`里添加代码：
```
  {
    test: /\.js$/,
    use: 'babel-loader',
    exclude: /node_modules/
  }
```

新建配置文件.babelrc在项目根目录下。
在.babelrc配置文件中，主要是对预设（presets）和插件（plugins）进行配置。写入：
```
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"] // 要求代码兼容最新两个版本的浏览器，不用兼容 IE 8，另外市场份额超过 1% 的浏览器也必须支持
      }
    }],
    "stage-2"
  ]
}

```
在`index.js`中写入：
```
const name = 'yoko';
const print = (name) => {
  console.log(name);
};
print(name);
``` 
此时运行 `npm run dev` 后 `index.js` 转为
```
var name = 'yoko';
var print = function print(name) {
  console.log(name);
};
print(name);

```
- 安装 url-loader

url-loader 用于模块化字体文件和图片文件.


首先安装 `url-loader`
```
cnpm i url-loader -D
```
其次，在`webpack.base.conf.js `的`module.rules`中添加对字体和图片的配置:
```
  {
    test:  /\.(png|jpg|gif)$/,
    use: [
      {
        loader: 'file-loader',
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
        loader: 'file-loader',
        options: {
          limit: 10000
        }
      }
    ]
  }
```

> url-loader 和 file-loader 对比
file-loader相比差不多，url-loader会按照配置把小于一定大小的图片以dataUrl的形式储存。
url-loader工作分两种情况：
1. 文件大小小于limit参数，url-loader将会把文件转为DataURL；
2. 文件大小大于limit，url-loader会调用file-loader进行处理，参数也会直接传给file-loader
url-loader封装了file-loader。url-loader不依赖于file-loader，即使用url-loader时，只需要安装url-loader即可，不需要安装file-loader，因为url-loader内置了file-loader。

- 安装 vue-loader
```
  cnpm i vue-loader vue-template-compiler -D
```

