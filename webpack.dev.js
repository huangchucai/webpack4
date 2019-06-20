const common = require('./webpack.common');
const {smart} = require('webpack-merge');
const path = require('path');

module.exports = smart(common, {
    devServer: {
        // port: 3000,
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        progress: true,
    },
    mode: 'development',
    devtool: 'source-map',
});
