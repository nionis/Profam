'use strict';

let profam = require('../distribution/profam.js');

let x = new profam();

x.profanity.setLocales('custom', true, true);
x.profanity.addWords('custom', ['pineapples', 'olives']);

x.profanity.setModes(['asterisks-full', 'funny']);

console.log(x.proceed('I dont want PINEAPPLES or olives in my pizza.'));
