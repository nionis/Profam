webpackHotUpdate(0,{

/***/ 22:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _logger = __webpack_require__(2);

	var _logger2 = _interopRequireDefault(_logger);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var spam = function () {
	  function spam(options) {
	    _classCallCheck(this, spam);

	    this.enable = 0;
	    this.frequency = 4;
	  }

	  _createClass(spam, [{
	    key: 'proceed',
	    value: function proceed(str) {
	      var frequencyCheck = function frequencyCheck(str) {
	        var times = 4;

	        var _loop = function _loop(i) {
	          var reverted = str.split('').reverse();
	          var newArr = [];

	          reverted.forEach(function (char, i1) {
	            var bundle = makeBundle(reverted, i1, times);
	            var future = makeBundle(reverted, i1 + times, times);

	            if (bundle !== future) {
	              newArr.push(char);
	            }
	          });
	          str = newArr.reverse().join('');
	        };

	        for (var i = 0; i < times; i++) {
	          _loop(i);
	        }

	        return str;
	      };

	      var makeBundle = function makeBundle(arr, i, times) {
	        var bundleStr = [];

	        for (var c = 0; c < times; c++) {
	          bundleStr.push(arr[i + c] || '');
	        }

	        bundleStr = bundleStr.join('');
	        return bundleStr;
	      };

	      return frequencyCheck(text.replace(/(.)\1{3,}/g, '$1$1$1'));
	    }
	  }]);

	  return spam;
	}();

	;

	exports.default = spam;

/***/ }

})