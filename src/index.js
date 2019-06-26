import { aa } from './test';

console.log(aa());
if (module.hot) {
    module.hot.accept('./test', function () {
        const result = require('./test');
        console.log(result);
        console.log(result.aa);
        console.log(result.name);
        console.log('文件更新了------');
    });
}
