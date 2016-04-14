'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var profanity = function () {
  function profanity() {
    _classCallCheck(this, profanity);

    this.enable = 1; //  1, 0  : Enabled or Disabled

    this.locales = new Map(); // Can check modes available, enabled
    this.localesDir = null; // Url Mockup of locales location for axio.get

    this.modes = new Map([//  Can check modes available, enabled
    ['asterisks-obscure', { 'enabled': 1 }], ['asterisks-full', { 'enabled': 0 }], ['choice', { 'enabled': 0, data: [] }], ['funny', { 'enabled': 0, data: ['bunnies', 'butterfly', 'kitten', 'love', 'gingerly', 'flowers', 'puppy', 'joyful', 'rainbows', 'unicorn'] }], ['grawlix', { 'enabled': 0 }], ['grawlix', { 'enabled': 0 }], ['spaces', { 'enabled': 0 }], ['black', { 'enabled': 0 }], ['hide', { 'enabled': 0 }], ['bleep', { 'enabled': 0 }]]);

    this.wholeWord = 0;
  }

  // Utils


  _createClass(profanity, [{
    key: 'makeUrl',
    value: function makeUrl() {
      var locale = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (this.localesDir !== null) {
        return this.localesDir.replace(/\[locale\]/g, locale);
      } else {
        logger('Locale provided is undefined or null, Usage: .makeUrl(<string>)');
      }
    }

    // updateLocalesFromDir(dir) {
    //   let path = require('path'),
    //         fs = require('fs');
    //
    //   let files = fs.readdirSync(dir);
    //   files.forEach((file) => {
    //     let options = this.locales.get(file);
    //
    //     try {
    //       options.data = fs.readFileSync(`${dir}/${file}`, 'utf8');
    //       this.locales.set(file, options);
    //     } catch (err) {
    //       logger(`Couldn't read ${file}`);
    //     }
    //   });
    //
    //   logger('Updated Locales');
    // }

    // I\O
    //Setters

    //Set locales dir

  }, {
    key: 'setLocalesDir',
    value: function setLocalesDir() {
      var dir = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (dir !== null) {
        this.localesDir = dir;

        // if (this.env == 'server') {
        //   this.updateLocalesFromDir(dir);
        // }
      } else {
          logger('Invalid locales dir provided');
        }
    }
  }, {
    key: 'setLocales',
    value: function setLocales() {
      var locales = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      var _this = this;

      var isCustom = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];
      var isAdd = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];

      var self = this;
      locales = toArray(locales);

      //Process Locales
      var processLocale = function processLocale(item) {
        var _self$locales;

        if (!isAdd) {
          self.locales.clear();
        }
        (_self$locales = self.locales).set.apply(_self$locales, _toConsumableArray(item));
      };

      //Prepare locales
      if (locales.length) {
        locales.filter(function (locale) {
          return !_this.locales.has(locale);
        }).forEach(function (locale) {
          if (!isCustom) {
            var url = _this.makeUrl(locale);

            axios.get(url).then(function (response) {
              processLocale([locale, { 'enabled': 1, 'available': 1, 'data': response.data }]);
            }).catch(function (response) {
              logger('Tried to download locale but catched an error', response);
            });
          } else {
            processLocale([locale, { 'enabled': 1, 'available': 1, 'data': [] }]);
          }
        });
      } else {
        logger('Provided empty string or array, Usage: .downloadLocales(<string/array>)');
      }
    }
  }, {
    key: 'setModes',
    value: function setModes() {
      var _this2 = this;

      var modes = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

      if (modes !== null) {
        modes = toArray(modes);

        [].concat(_toConsumableArray(this.modes.keys())).forEach(function (mode) {
          var enabled = 0;
          var options = _this2.modes.get(mode);

          if (modes.indexOf(mode) !== -1) {
            enabled = 1;
          }

          options.enabled = enabled;
          _this2.modes.set(mode, options);
        });

        logger('Added Modes', modes);
      } else {
        logger('setModes received null');
      }
    }
  }, {
    key: 'addChoices',
    value: function addChoices() {
      var _options$data;

      var words = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];
      var isAdd = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

      words = toArray(words);

      var options = this.modes.get('choice');
      if (!isAdd) {
        options.data = [];
      }
      (_options$data = options.data).push.apply(_options$data, _toConsumableArray(words));
      options.data = [].concat(_toConsumableArray(new Set(options.data)));
      this.modes.set('choice', options);

      return options.data;
    }
  }, {
    key: 'addWords',
    value: function addWords() {
      var locale = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
      var words = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];
      var isAdd = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

      words = toArray(words);

      if (this.locales.has(locale)) {
        var _options$data2;

        var options = this.locales.get(locale);
        if (!isAdd) {
          options.data = [];
        }
        (_options$data2 = options.data).push.apply(_options$data2, _toConsumableArray(words));
        options.data = [].concat(_toConsumableArray(new Set(options.data)));

        this.locales.set(locale, options);

        return options.data;
      } else {
        logger('addWords: this locale doesnt exist, you might need to setLocales first');
      }
    }
  }, {
    key: 'removeWords',
    value: function removeWords() {
      var locale = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
      var words = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

      words = toArray(words);

      if (this.locales.has(locale)) {
        var options = this.locales.get(locale);
        options.data = options.data.filter(function (word) {
          return !(words.indexOf(word) !== -1);
        });
        this.locales.set(locale, options);

        return options.data;
      } else {
        logger('removeWords: this locale doesnt exist, you might need to setLocales first');
      }
    }

    //Getters

  }, {
    key: 'getLocales',
    value: function getLocales() {
      return [].concat(_toConsumableArray(this.locales.keys()));
    }
  }, {
    key: 'getLocalesEnabled',
    value: function getLocalesEnabled() {
      var _this3 = this;

      return [].concat(_toConsumableArray(this.locales.keys())).filter(function (locale) {
        return _this3.locales.get(locale).enabled;
      });
    }
  }, {
    key: 'getModes',
    value: function getModes() {
      return [].concat(_toConsumableArray(this.modes.keys()));
    }
  }, {
    key: 'getModesEnabled',
    value: function getModesEnabled() {
      var _this4 = this;

      return [].concat(_toConsumableArray(this.modes.keys())).filter(function (mode) {
        return _this4.modes.get(mode).enabled;
      });
    }

    //Profanity behavior

  }, {
    key: 'proceed',
    value: function proceed() {
      var _this5 = this;

      var strings = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      strings = toArray(strings);

      //Locales
      var localesEnabled = [].concat(_toConsumableArray(this.locales.keys())).filter(function (locale) {
        return _this5.locales.get(locale).enabled;
      });
      var localesAllWords = localesEnabled.reduce(function (allLocales, locale) {
        allLocales.push.apply(allLocales, _toConsumableArray(_this5.locales.get(locale).data));
        return allLocales;
      }, []);

      //Modes
      var modesEnabled = [].concat(_toConsumableArray(this.modes.keys())).filter(function (mode) {
        return _this5.modes.get(mode).enabled;
      });

      var processed = strings.map(function (string) {
        return modesEnabled.map(function (mode) {
          var toProcess = string;

          localesAllWords.forEach(function (word) {
            var isIncluded = toProcess.match(new RegExp(word, 'gi'));
            if (isIncluded !== null && isIncluded.length > 0) {
              (function () {
                var wordLength = word.length;
                var replaceStr = function () {
                  switch (mode) {
                    case 'choice':
                      {
                        var list = _this5.modes.get('choice').data;
                        return list[randomRange(0, list.length)] || '';
                      }
                    case 'funny':
                      {
                        var _list = _this5.modes.get('funny').data;
                        return _list[randomRange(0, _list.length)] || '';
                      }
                    case 'spaces':
                      {
                        return ' '.repeat(wordLength);
                      }
                    case 'black':
                      {
                        return '&#9632;'.repeat(wordLength);
                      }
                    case 'asterisks-full':
                      {
                        return '*'.repeat(wordLength);
                      }
                    case 'asterisks-obscure':
                      {
                        return word[0] + '*'.repeat(wordLength - 2) + word[word.length - 1];
                      }
                    case 'bleep':
                      {
                        return 'BEEP';
                      }
                    case 'grawlix':
                      {
                        var _ret2 = function () {
                          var grawlixChars = ['!', '@', '#', '$', '%', '~', '*'];
                          return {
                            v: word.split('').map(function (char) {
                              return grawlixChars[randomRange(0, grawlixChars.length)];
                            }).join('')
                          };
                        }();

                        if ((typeof _ret2 === 'undefined' ? 'undefined' : _typeof(_ret2)) === "object") return _ret2.v;
                      }
                    case 'hide':
                      {
                        return '';
                      }
                    //asterisks-obscure
                    default:
                      {
                        return word[0] + '*'.repeat(wordLength - 2) + word[word.length - 1];
                      }
                  }
                }();

                toProcess = function () {
                  var reqexp = new RegExp(word, 'gi');
                  if (_this5.wholeWord) {
                    reqexp = new RegExp('\\b' + word + '\\b', 'gi');
                  }

                  return toProcess.replace(reqexp, replaceStr);
                }();
              })();
            }
          });

          return toProcess;
        });
      });

      var whatIsReturn = whatIs(processed);
      return whatIsReturn == 'Array' && processed.length == 1 ? processed[0] : processed;
    }
  }]);

  return profanity;
}();

;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var axios = require('axios'),
    env = typeof process === 'undefined' ? 'browser' : 'server';

module.exports = function () {
  function _class() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];

    _classCallCheck(this, _class);

    //Initialization
    this.profanity = new profanity();
    this.spam = new spam();

    //Update Options with options provided in initialization.
    if (options !== null) {
      var keys = Object.keys(options);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var key = _step.value;

          if (key == 'profanity' || key == 'spam') {
            this[key] = Object.assign(this[key], options[key]);
          } else {
            this[key] = options[key];
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else {/* logger('No options provided in initialization, not a problem tho.'); */}
  }

  _createClass(_class, [{
    key: 'proceed',
    value: function proceed(str) {
      str = this.spam.enable ? this.spam.proceed(str) : str;
      str = this.profanity.enable ? this.profanity.proceed(str) : str;
      return str;
    }
  }]);

  return _class;
}();
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var spam = function () {
  function spam() {
    _classCallCheck(this, spam);

    this.enable = 0;
    this.frequency = 3;
  }

  // I\O


  _createClass(spam, [{
    key: 'setFrequency',
    value: function setFrequency(f) {
      this.frequency = f;
    }

    // Spam functionality

  }, {
    key: 'proceed',
    value: function proceed() {
      var _this = this;

      var strings = arguments.length <= 0 || arguments[0] === undefined ? [] : arguments[0];

      strings = toArray(strings);

      return strings.map(function (str) {
        var frequencyCheck = function frequencyCheck(str) {
          var times = _this.frequency;

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

        return frequencyCheck(str.replace(/(.)\1{3,}/g, '$1$1$1'));
      });
    }
  }]);

  return spam;
}();

;
'use strict';

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

var logger = function logger() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = args[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var argument = _step.value;

      console.log('Profam:', argument);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
};
