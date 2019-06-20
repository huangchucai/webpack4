# webpack4
## 基本配置
#### 第一节 零配置
* 分支： `master`
* 内容：
    1. npm i webpack webpack-cli -D
    1. 安装webpack后运行 `npx webpack`
    2. 默认读取src下面的index.js
    3. 会提示需要安装webpack-cli

#### 第二节 编写基本配置
* 分支： `first-section`
* 内容： 
    1. 新建`webpack.config.js`文件
    2. webpack4中需要自动添加`mode`表示是开发模式还是生产模式
    3. output中的`path`必须是绝对路径
## HTML    
#### 第三节 配置server和插件（方便查看结果）
* 分支： `second-section`
* 需求： 我们不想每次查看结果的时候，自己手动打开`index.html`文件，需要有一个服务器帮我们打开
* 内容： 
    1. 安装`webpack-dev-server`插件，启动服务器浏览结果
    2. `npx webpack-dev-server`默认会在当前文件夹开启8080端口的服务器
    3. 在`webpack.config.js`中配置可以指定目录等配置
    ```javascript
      module.exports = {
        //...
        devServer: {
          contentBase: path.join(__dirname, 'dist'), //服务器的启动目录
          compress: true, // 压缩
          port: 9000 // 端口
        }
      };
    ```

#### 第四节 配置HTML文件
* 分支： `three-section`
* 需求：每次查看结果的时候，我们需要在dist目录创建一个`index.html`,现在想不需要dist目录
* 内容：
    1. 安装`html-webpack-plugin`
    2. 插件的使用
    3. 启动`npm run dev`
    4. `npm run build`的时候一些`hash`和`html`压缩的使用

## CSS
#### 第五节  css-loader的使用
* 分支： `four-section`
* 需求：我们需要再项目中使用一些css，不需要我们直接link引用，而可以像js那样模块引用
* 内容： 
    1. 由于css本身没有一些模块的支持，所以我们需要在webpack中定义来转换css的文件
    2. 安装一些loader `css-loader style-loader stylus stylus-loader`
    3. 编写`webpack.config.js`中的一些配置`module`
    
#### 第六节 抽离css的模块和前缀的添加
* 分支： `four-section`
* 需求：
    * 有时候我们不需要写成行内样式，而需要把css单独抽成一个文件，然后引入到`index.html`中
    * 一些css3 新的语法可以进行一些转换
* 内容： 
    1. 安装插件`mini-css-extract-plugin`
    2. 然后在`module`的`rules`中使用`MiniCssExtractPlugin.loader`，去掉`style-loader`
    3. 安装`postcss-loader` 加在`css-loader`前面添加 和 `autoprefixer`添加浏览器前缀
    4. css压缩  `optimize-css-assets-webpack-plugin` 会破坏原有的js的压缩,需要手动再添加插件`uglifyjs-webpack-plugin`
    
## JS
#### 第六节 ES6/ES7 转换成ES5
* 分支： `five-section`
* 需求： 我们需要使用一些JS的高级语法，所以需要进行一些转换
* 内容：
    1. 使用bable进行转换，安装必要的`loader` 和一些babel需要的核心模块
    2. loader: `babel-loader` babel需要的模块：  `@babel/core` 语法转换：`@babel/preset-env`  
    3. 配置loader和选项  
    ```javascript
      options: {
          presets: ['@babel/preset-env'],
          plugins: ['@babel/plugin-proposal-class-properties']
       }
    ```
* 优化： 
    1. 使用`@babel/plugin-transform-runtime`来优化代码（重复使用的抽离），在生产环境需要搭配`@babel/runtime`
    2. 使用`@babel/polyfill` 来使用一些自带的方法 [文档](https://babeljs.io/docs/en/babel-polyfill)
    
#### 第七节 eslint配置
* 分支： `five-section`
* 需求：需要进行一些js的写法规范
* 内容
    1. 安装eslint模块 `npm i eslint -D`
    2. 配置`.eslintrc`的一些配置
    
#### 第八节 第三方模块的使用
* 分支： `six-section`
* 需求： 我们需要在我们的代码中使用第三方的模块
* 内容 
    1. `export-loader` 暴露到window上
    2. `webpack.ProvidePlugin` 给每一个模块提供
    ```javascript
    new webpack.ProvidePlugin({
      $: 'jquery'
    })
    ```
    3. 直接`index.html`引入， 但是要配置不打包    

#### 第九节  webpack处理图片
* 分支： `seven-section`
* 需求：我们有时候会在css和js中使用图片，需要使用webpack引入图片 1. js创建图片引入`Image` 2. css的`background` 3. HTML中使用`img`
* 内容：
    1. 需要使用`url-loader` 当图片小于一定值的时候转换为base64,其他情况使用`file-loader`为图片
    2. 在webpack中配置图片的处理
    3. 如果需要再`index.html`中使用图片，可以使用require语句或者使用`html-loader`
    ```javascript
    <img src="${require('./group.png')}" alt="">
    ```
#### 第九节  文件的归类
* 分支： `seven-section`
* 需求：需要把打包出来的文件对应的相应的目录
* 内容：
     1. css对应最后的处理plugin `MiniCssExtractPlugin`(一般都是filename的那个处理)
     2. js对应`output`的路径配置
     3. 图片对应`url-loader`本质上是调用了`file-loader`的options中的`outputPath`
  
#### 第九节  cdn的单个使用或者整体使用
* 分支： `seven-section`
* 需求：需要把打包出来的文件添加对应的cdn域名
* 内容：
   1. 全局配置cdn路径是output下面配置`publicPath`
   2. 可以在单独的模块中配置`publicPath`单独的为不同的类型配置 
   
#### 第十节 多页面的配置
* 分支 `eight-section`
* 需求： 需要多个页面的来展示不同的效果
* 内容： 
    1. 需要配置多个`entry`，所以entry为一个对象
    2. 多个入口文件`index.html`, 产生不同名字的文件
    3. 由于`HtmlWebpackPlugin`这个插件会把文件产生的资源都插到对应的`template`中，所以我们需要指定对应的文件插入对应的打包资源
    4. 配置`HtmlWebpackPlugin`的`chunks`, 只打包对应的资源到对应的模板   
     
#### 第十一节 source-map的使用
* 分支： `seven-section`
* 需求：方便我们调试开发代码，需要源码映射
* 内容：
   1. 在`webpack.config.js`中使用`devtool`

#### 第十二节  实时监控watch
* 分支： `seven-section`
* 需求：方便我们实时的打包文件
* 内容：
   1. 在`webpack.config.js`中使用`watch`
#### 第十二节  实时监控watch
* 分支： `seven-section`
* 需求：一些常用的插件
* 内容：
   1. `clean-webpack-plugin`清空指定目录
   2. `copy-webpack-plugin` 复制指定目录
   3. webpack内置`BannerPlugin`： 添加版权说明

## 服务器交互
#### 第十三节 跨域问题和Mock数据、启动服务器
* 分支：`nine-section`
* 需求：有时候我们需要解决一些跨域问题和一些测试数据的mock,以及自己写一个服务器
* 内容：
    1. 解决跨域问题，使用`express`进行转换 例如：服务端开启的是一个3000的端口（`server.js`）, 而我
    们的`webpack-dev-server`开启的是一个8080端口
    
    ```javascript
      先发的到8080端口 （`webpack-dev-server`）=> 转发给3000
      devServer: {
        proxy: {
          '/api': 'http://localhost:3000'  // 以api开头的请求转发到3000端口上
        }  
      }
    
      // /api/user  => 转到3000的端口的 /user
      devServer: {
        proxy: {
          '/api':  {
              target: 'http://localhost:3000',
              pathRewite: {
                  "/api": ""  
              }
          }
        }  
      }  
    ```
    
    2. 前端单纯的Mock数据 (启动devServer默认提供的钩子)
    ```javascript
      devServer: {
           before(app) {
              app.get('/api/user', (req,res) => {
                  res.json({name: 'hcc-mock-before'})
              })
            }
      }
    ```
    3. 不使用代理，在启动服务端的时候启动webpack(2个公用同一个端口，不存在跨域)
    ```javascript
      const webpack = require('webpack');
      const middleware = require('webpack-dev-middleware');
      const config = require('./webpack.config.js');
      const compile = webpack(config);

      app.use(middleware(compile));
    ```

## 拓展
#### resolve (解析)
* 分支： `ten-section`
* 需求： 
    1. 寻找第三方模块的时候，只限于本目录下面的`node_modules`,而不向上查找。（`modules`）
    2. 一些别名来减少字段（`alias`）
    3. import第三方模块的时候默认会读取`package.json`下面的main字段，希望优先读取别的字段（`mainFields`）
    4. 默认添加一些后缀查找（`extensions`）

#### 环境变量和开发、生成配置分开
* 分支：`ten-section`
* 需求： 
    1. 有时候我们需要在开发文件中使用一些环境变量来区分一些内容
    2. 在开发环境和生成环境需要不同的webpack内容，例如：开发环境的`source-map`和生产环境的一些压缩等
* 内容：
    1. 使用webpack内置的`webpack.DefinePlugin` 在编译的时候提供配置的全局变量
    2. 使用`webpack-merge`来区分不同环境的不同配置文件
