// webpack使用node编写，所以使用COMMON.js模块导出
const path = require('path');

const HtmlWebpackPlugin = require('Html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpack = require('webpack');


module.exports = {
    entry: {
        index: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[hash:8].js',
        // publicPath: 'http://localhost:3000'
    },
    resolve: {
        modules: ["node_modules"],
        extensions: ['.js','.css','.json','.vue'],
        mainFields: ['main', 'style'],
        alias: {
            bootstrap: 'bootstrap/dist/css/bootstrap.css'
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(true),
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html'),
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true, // 删除双引号
                collapseWhitespace: true, //折叠成一行
            },
            chunks: ['index'],
            hash: true
        }),
        new MiniCssExtractPlugin({
            filename: 'css/[name]_[hash:8].css'
        }),
        new webpack.ProvidePlugin({
            $: 'jquery'
        }),
        // new CleanWebpackPlugin(),
        new CopyWebpackPlugin([
            // {from: '/src/logo.svg', to: './'}
        ]),
        new webpack.BannerPlugin('make hcc 2019'),
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dist', 'mainfest.json')
        })
    ],
    module: { // loader默认的右 -> 左 下 -> 上n
        rules: [
            {
                test: /\.png|gif|jpg|jepg|svg$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 50 * 1024,   // s=50k一下使用base64
                        outputPath: '/images/',
                    }
                }
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'eslint-loader',
                },
                enforce: 'pre',// 优先执行
                exclude: /node_modules/,
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader', // @babel/preset-env 大的插件使用 ES6 -> ES5
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react'],
                        'plugins': [
                            ['@babel/plugin-proposal-decorators', {'legacy': true}],
                            ['@babel/plugin-proposal-class-properties', {'loose': true}],
                            '@babel/plugin-transform-runtime',
                            '@babel/plugin-syntax-dynamic-import'
                        ]
                    }
                },
                include: path.resolve(__dirname, 'src'),
                exclude: '/node_modules'
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
