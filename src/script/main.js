import "jquery";
//引入页面的css
import '../stylesheets/cartlist.css';
import '../stylesheets/details.css';
import '../stylesheets/login.css';
import '../stylesheets/registry.css';

import{Shangpinglist,Louti} from './shangpinglist.js';
new Shangpinglist().init();
new Louti().init();

import{Registry} from './registry.js';
new Registry().init();

import{Login} from './login.js';
new Login().init();

import{Details} from './details.js';
new Details().init();

import{Cartlist} from './cartlist.js';
new Cartlist().init();


