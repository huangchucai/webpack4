const express = require('express');
const app = express();

app.get('/user', (req, res) => {
    res.json({name: 'hcc',age: 26});
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
