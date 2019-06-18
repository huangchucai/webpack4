// webpack使用node编写，所以使用COMMON.js模块导出
const path = require('path');
const HtmlWebpackPlugin = require("Html-webpack-plugin");
module.exports = {
    devServer: {
        port: 3000,
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        progress: true
    },
    mode: 'production',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.[hash:8].js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify:{
                removeAttributeQuotes: true, // 删除双引号
                collapseWhitespace: true, //折叠成一行
            },
            hash: true
        })
    ]
};
