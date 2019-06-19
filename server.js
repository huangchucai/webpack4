const express = require('express');
const app = express();
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const config = require('./webpack.config.js');
const compile = webpack(config);


app.use(middleware(compile));

app.get('/api/user', (req, res) => {
    res.json({name: 'hcc', age: 26});
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
