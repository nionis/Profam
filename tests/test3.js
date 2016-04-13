'use strict';

let profam = require('../distribution/profam.js');

let x = new profam();

x.profanity.setLocales('custom', true, true);
x.profanity.addWords('custom', ['pineapples', 'olives']);

x.profanity.setModes('grawlix');


let max = 1000;
for (let i=0; i<max; i++) {
  console.log(x.proceed('pineapplesolivespineapplesolivespineapplesolivespineapplesolivespineapplesolivespineapplesolives')[0]);
}
