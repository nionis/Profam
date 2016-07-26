'use strict';

let profam = require('../distribution/profam.js');

let x = new profam();

x.profanity.enable = false;
x.spam.enable = true;

console.log(x.proceed('aaaaaaaaaaaaaaaaaaaaaaaaaaa I dont want pineapplesssssssssssssssss or olives in my pizza.'));
