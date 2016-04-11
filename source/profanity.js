import axios       from 'axios';
import logger      from './logger.js';
import { toArray, randomRange, whatIs } from './utils.js';

class profanity {
  constructor() {
    this.enable  = 1;                                                                         //  1, 0  : Enabled or Disabled

    this.locales = new Map();                                                                 // Can check modes available, enabled
    this.localesUrlMockup = null;                                                             // Url Mockup of locales location for axio.get

    this.modes   = new Map([                                                                  //  Can check modes available, enabled
      ['choice'            , { 'enabled': 0 , data: [] }],
      ['funny'             , { 'enabled': 0 , data: ['bunnies', 'butterfly', 'kitten', 'love', 'gingerly', 'flowers', 'puppy', 'joyful', 'rainbows', 'unicorn'] }],
      ['grawlix'           , { 'enabled': 0 }],
      ['asterisks-obscure' , { 'enabled': 0 }],
      ['asterisks-full'    , { 'enabled': 0 }],
      ['grawlix'           , { 'enabled': 0 }],
      ['spaces'            , { 'enabled': 0 }],
      ['black'             , { 'enabled': 0 }],
      ['hide'              , { 'enabled': 0 }],
      ['bleep'             , { 'enabled': 0 }]
    ]);

    this.wholeWord = 0;
  }

  // Utils
  makeUrl(locale=null) {
    if (this.localesUrlMockup !== null) {
      return this.localesUrlMockup.replace(/\[locale\]/g, locale);
    } else { logger('Locale provided is undefined or null, Usage: .makeUrl(<string>)'); }
  }


  // I\O
  //Setters
  setLocales(locales=[], isCustom=0, isAdd=1) {
    let self = this;
    locales = toArray(locales);

    //Process Locales
    let processLocale = (item) => {
      if(!isAdd) { self.locales.clear(); }
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

  addWords(locale=null, words=[]) {
    words = toArray(words);

    if (this.locales.has(locale)) {
      let options = this.locales.get(locale);
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
  getModes() {
    return [...this.modes.keys()];
  }


  //Profanity behavior
  proceed(strings=[]) {
    strings = toArray(strings);

    //Locales
    let localesEnabled = [...this.locales.keys()].filter((mode) => {
      return this.locales.get(mode).enabled;
    });
    let localesAllWords = localesEnabled.reduce((allLocales, locale) => {
      allLocales.push(...this.locales.get(locale).data);
      return allLocales;
    }, []);

    //Modes
    let modesEnabled = [...this.modes.keys()].filter((mode) => {
      return this.modes.get(mode).enabled;
    });

    //Search each word
    let toReturn = strings.map((string) => {
      let modeElected = modesEnabled[randomRange(0, modesEnabled.length)] || 'spaces';

      //localesAllWords, modeElected, string
      localesAllWords.forEach((word) => {
        if(string.includes(word)) {
          let wordLength = word.length;
          let replaceStr = (() => {
            switch (modeElected) {
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
              case 'bleep': {
                return 'BLEEP';
              }
              case 'grawlix': {
                let grawlixChars = ['!','@','#','$','%','&','*'];
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

          string = (() => {
            let reqexp = new RegExp(word, 'gi');
            if(this.wholeWord) { reqexp =  new RegExp('\\b'+ word + '\\b', 'gi'); }

            return string.replace(reqexp, replaceStr);
          })();
        }
      });

      return string;
    });

    let whatIsReturn = whatIs(toReturn);
    return whatIsReturn == 'Array' && toReturn.length == 1 ? toReturn[0] : toReturn;
  }
};

export default profanity;
