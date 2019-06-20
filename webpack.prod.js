const common = require('./webpack.common');
const {smart} = require('webpack-merge');

const OptimizeCSSAssertsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = smart(common, {
    mode: 'production',
    optimization: {
        minimizer: [
            new OptimizeCSSAssertsPlugin(),
            new UglifyJsPlugin({
                cache: true,
                parallel: true, // 并行请求
                sourceMap: true,
            })
        ]
    },
});
