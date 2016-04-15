'use strict';

let profam = require('../distribution/profam.js');

let x = new profam();

x.profanity.setLocales('custom', true, true);
x.profanity.addWords('custom', ['!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '=', '-', '\\', '|', '/', '+']);

x.profanity.setModes(['asterisks-full']);

console.log(x.proceed('! @ # $ % ^ & * ( ) _ = - \ | / +'));
