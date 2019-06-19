require('@babel/polyfill');
require('./index.css');
import logo from './logo.svg';
import group from './group.png';

const image = new Image(100, 100);
image.src = group;
document.body.appendChild(image);
console.log(group);
console.log(logo);

