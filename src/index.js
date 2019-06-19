// require('@babel/polyfill');
require('./index.css');

const axios = require('axios');
axios.get('/api/user').then(res => {
    console.log(res);
});
