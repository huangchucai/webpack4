const common = require('./webpack.common');
const {smart} = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');

module.exports = smart(common, {
    devServer: {
        // port: 3000,
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        progress: true,
        hot: true
    },
    mode: 'development',
    devtool: 'source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
});
