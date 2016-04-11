webpackHotUpdate(0,{

/***/ 5:
/***/ function(module, exports) {

	"use strict";

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

	var toArray = function toArray(item) {
	  debugger;
	  return item.constructor === String ? [item] : item.constructor === Array ? item : [];
	};

	exports.arrRemove = arrRemove;
	exports.toArray = toArray;

/***/ }

})