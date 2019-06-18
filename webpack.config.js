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
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'build.js'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html'
        })
    ]
};
