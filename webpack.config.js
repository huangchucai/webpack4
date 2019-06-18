// webpack使用node编写，所以使用COMMON.js模块导出
const path = require('path');

const HtmlWebpackPlugin = require('Html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssertsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


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
    optimization: {
        minimizer: [
            new OptimizeCSSAssertsPlugin(),
            new UglifyJsPlugin({
                cache: true,
                parallel: true, // 并行请求
                sourceMap:true,
            })
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true, // 删除双引号
                collapseWhitespace: true, //折叠成一行
            },
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: '[name]_[hash:8].css'
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                    },
                    'postcss-loader',
                ]
            },
            {
                test: /\.styl$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',   // 解析@import 语法
                    'postcss-loader',
                    'stylus-loader' // stylus -> css
                ]
            }
        ]
    }
};
