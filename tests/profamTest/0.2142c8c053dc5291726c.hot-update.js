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

	  if (item == null) {
	    return null;
	  }

	  var stringify = item.constructor.toString();

	  return stringify == Array.toString() ? 'Array' : stringify == Number.toString() ? 'Number' : stringify == Object.toString() ? 'Object' : stringify == Function.toString() ? 'Function' : null;
	};

	var toArray = function toArray(item) {
	  return item.constructor === String ? [item] : item.constructor === Array ? item : [];
	};

	exports.arrRemove = arrRemove;
	exports.toArray = toArray;

/***/ }

})