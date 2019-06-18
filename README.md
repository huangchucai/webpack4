## webpack4

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
