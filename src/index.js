require('@babel/polyfill');

require('./index.css');
require('./test.styl');
const a = require('./a.js');
console.log(a);
let fn = () => {
    console.log(a.name);
};
fn();

console.log([1, 2, 3].includes(2));
