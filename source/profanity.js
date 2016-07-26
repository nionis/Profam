import { whatIs, toArray, randomRange, logger, escapeSymbols } from './utils'


class profanity {
  constructor() {
    this.enable  = 1;                                                                         //  1, 0  : Enabled or Disabled

    this.locales = new Map();                                                                 // Can check modes available, enabled
    this.localesDir = null;                                                                   // Url Mockup of locales location for axio.get

    this.modes   = new Map([                                                                  //  Can check modes available, enabled
      ['asterisks-obscure' , { 'enabled': 1 }],
      ['asterisks-full'    , { 'enabled': 0 }],
      ['choice'            , { 'enabled': 0 , data: [] }],
      ['funny'             , { 'enabled': 0 , data: ['bunnies', 'butterfly', 'kitten', 'love', 'gingerly', 'flowers', 'puppy', 'joyful', 'rainbows', 'unicorn'] }],
      ['grawlix'           , { 'enabled': 0 }],
      ['spaces'            , { 'enabled': 0 }],
      ['black'             , { 'enabled': 0 }],
      ['hide'              , { 'enabled': 0 }],
      ['beep'              , { 'enabled': 0 }]
    ]);

    this.wholeWord = 0;
  }

  // Utils
  makeUrl(locale=null) {
    if (this.localesDir !== null) {
      return this.localesDir.replace(/\[locale\]/g, locale);
    } else { logger('Locale provided is undefined or null, Usage: .makeUrl(<string>)'); }
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
  setLocalesDir(dir=null) {
    if (dir !== null) {
      this.localesDir = dir;

      // if (this.env == 'server') {
      //   this.updateLocalesFromDir(dir);
      // }
    } else { logger('Invalid locales dir provided'); }
  }

  setLocales(locales=[], isCustom=0, isAdd=0) {
    let self = this;
    locales = toArray(locales);

    if(!isAdd) { self.locales.clear(); }

    //Process Locales
    let processLocale = (item) => {
      self.locales.set(...item);
    };

    //Prepare locales
    if (locales.length) {
      locales
        .filter((locale) => {
          return !this.locales.has(locale);
        })
        .forEach((locale) => {
          if(!isCustom) {
            let url  = this.makeUrl(locale);

            axios.get(url)
              .then(function (response) {
                processLocale([locale, { 'enabled': 1, 'available': 1, 'data': response.data }]);
              })
              .catch(function (response) {
                logger('Tried to download locale but catched an error', response);
              });
          } else {
            processLocale([locale, { 'enabled': 1, 'available': 1, 'data': [] }]);
          }
        });
    } else { logger('Provided empty string or array, Usage: .downloadLocales(<string/array>)'); }
  }

  setModes(modes=null) {
    if (modes !== null) {
      modes = toArray(modes);

      [...this.modes.keys()].forEach((mode) => {
        let enabled = 0;
        let options = this.modes.get(mode);

        if (modes.includes(mode)) {
          enabled = 1;
        }

        options.enabled = enabled;
        this.modes.set(mode, options);
      });

      logger('Added Modes', modes);
    } else { logger('setModes received null'); }
  }

  addChoices(words=[], isAdd=1) {
    words = toArray(words);

    let options = this.modes.get('choice');
        if(!isAdd) { options.data = []; }
        options.data.push(...words);
        options.data = [...new Set(options.data)];
    this.modes.set('choice', options);

    return options.data;
  }

  addWords(locale=null, words=[], isAdd=true) {
    words = toArray(words);

    if (this.locales.has(locale)) {
      let options = this.locales.get(locale);
          if(!isAdd) { options.data = []; }
          options.data.push(...words);
          options.data = [...new Set(options.data)];

      this.locales.set(locale, options);

      return options.data;
    } else { logger('addWords: this locale doesnt exist, you might need to setLocales first'); }
  }

  removeWords(locale=null, words=[]) {
    words = toArray(words);

    if (this.locales.has(locale)) {
      let options = this.locales.get(locale);
          options.data = options.data.filter((word) => {
            return !words.includes(word);
          });
          this.locales.set(locale, options);

      return options.data;
    } else { logger('removeWords: this locale doesnt exist, you might need to setLocales first'); }
  }

  //Getters
  getLocales() {
    return [...this.locales.keys()];
  }
  getLocalesEnabled() {
    return [...this.locales.keys()].filter((locale) => {
      return this.locales.get(locale).enabled;
    });
  }
  getModes() {
    return [...this.modes.keys()];
  }
  getModesEnabled() {
    return [...this.modes.keys()].filter((mode) => {
      return this.modes.get(mode).enabled;
    });
  }


  //Profanity behavior
  proceed(strings=[]) {
    strings = toArray(strings);

    //Locales
    let localesEnabled = [...this.locales.keys()].filter((locale) => {
      return this.locales.get(locale).enabled;
    });
    let localesAllWords = localesEnabled.reduce((allLocales, locale) => {
      allLocales.push(...this.locales.get(locale).data);
      return allLocales;
    }, []);

    //Modes
    let modesEnabled = [...this.modes.keys()].filter((mode) => {
      return this.modes.get(mode).enabled;
    });

    let processed = strings.map((string) => {
      return modesEnabled.map((mode) => {
        let toProcess = string;

        localesAllWords.forEach((word) => {
          word = escapeSymbols(word);
          let isIncluded = toProcess.match(new RegExp(word, 'gi'));
          if(isIncluded !== null && isIncluded.length > 0) {
            let wordLength = word.length;
            let replaceStr = (() => {
              switch (mode) {
                case 'choice': {
                  let list = this.modes.get('choice').data;
                  return list[randomRange(0, list.length)] || '';
                }
                case 'funny': {
                  let list = this.modes.get('funny').data;
                  return list[randomRange(0, list.length)] || '';
                }
                case 'spaces': {
                  return ' '.repeat(wordLength);
                }
                case 'black': {
                  return '&#9632;'.repeat(wordLength);
                }
                case 'asterisks-full': {
                  return '*'.repeat(wordLength);
                }
                case 'asterisks-obscure': {
                  return word[0] + '*'.repeat(wordLength-2) + word[word.length-1];
                }
                case 'beep': {
                  return 'BEEP';
                }
                case 'grawlix': {
                  let grawlixChars = ['!','@','#','$','%','~','*'];
                  return word.split('').map((char) => { return grawlixChars[randomRange(0, grawlixChars.length)]; }).join('');
                }
                case 'hide': {
                  return '';
                }
                //asterisks-obscure
                default: {
                  return word[0] + '*'.repeat(wordLength-2) + word[word.length-1];
                }
              }
            })();

            toProcess = (() => {
              let reqexp = new RegExp(word, 'gi');
              if(this.wholeWord) { reqexp =  new RegExp('\\b'+ word + '\\b', 'gi'); }

              return toProcess.replace(reqexp, replaceStr);
            })();
          }
        });

        return toProcess;
      });
    });

    let whatIsReturn = whatIs(processed);
    return whatIsReturn == 'Array' && processed.length == 1 ? processed[0] : processed;
  }
};

export default profanity;
