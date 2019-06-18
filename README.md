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
    1. 编写`webpack.config.js`文件
    2. webpack4中需要自动添加`mode`表示是开发模式还是生产模式
    3. output中的`path`必须是绝对路径
