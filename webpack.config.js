// webpack使用node编写，所以使用COMMON.js模块导出
const path = require('path');

const HtmlWebpackPlugin = require('Html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssertsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');


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
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        })
    ],
    module: { // loader默认的右 -> 左 下 -> 上
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'eslint-loader',
                },
                enforce: "pre",// 优先执行
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader', // @babel/preset-env 大的插件使用 ES6 -> ES5
                    options: {
                        presets: ['@babel/preset-env'],
                        "plugins": [
                            ["@babel/plugin-proposal-decorators", { "legacy": true }],
                            ["@babel/plugin-proposal-class-properties", { "loose" : true }],
                            "@babel/plugin-transform-runtime"
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude: "/node_modules"
            },
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
            },
        ]
    }
};
