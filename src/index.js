require("@babel/polyfill");

require('./index.css');
require('./test.styl');
const a = require('./a.js');
console.log(a);
const fn = () => {
    console.log(a.name);
};
fn();
@log
class Obj {
    a = 1;
}

function log(target) {
    console.log(target);
}
const obj = new Obj();
console.log(obj.a);
console.log([1, 2, 3].includes(2));
