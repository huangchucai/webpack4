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
