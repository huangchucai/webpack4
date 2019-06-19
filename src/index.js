require('@babel/polyfill');
require('./index.css');

class A {
    constructor() {
        console.lo('出错了');
    }
}

new A();
console.log('cc');

