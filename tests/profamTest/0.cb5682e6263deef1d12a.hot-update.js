webpackHotUpdate(0,{

/***/ 5:
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var arrRemove = function arrRemove(arr, item) {
	  while (arr.indexOf(item) !== -1) {
	    var index = arr.indexOf(item);
	    arr = arr.splice(index, 1);
	  }
	  return arr;
	};

	var whatIs = function whatIs() {
	  var item = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

	  var def = 'Null';

	  if (item == null) {
	    return def;
	  }

	  var stringify = item.constructor.toString();

	  return stringify == Array.toString() ? 'Array' : stringify == String.toString() ? 'String' : stringify == Number.toString() ? 'Number' : stringify == Object.toString() ? 'Object' : stringify == Function.toString() ? 'Function' : def;
	};

	var toArray = function toArray(item) {
	  var constructor = whatIs(item);
	  return constructor == 'Array' ? item : constructor == 'Number' || constructor == 'String' ? [item] : null;
	};

	var randomRange = function randomRange() {
	  var min = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];
	  var max = arguments.length <= 1 || arguments[1] === undefined ? 101 : arguments[1];

	  return Math.floor(Math.random() * (max - min) + min);
	};

	exports.arrRemove = arrRemove;
	exports.toArray = toArray;
	exports.randomRange = randomRange;
	exports.whatIs = whatIs;

/***/ }

})