# Profam
All in One Profanity and Spam Tool, supporting multiple languages and modes.


## Tools Available
| Tool | Use | Default Status |
| --- | --- | --- |
| Profanity | Used to censor words using the selected modes. | Enabled |
| Spam | Uses an algorithm to stop repeating characters. | Disabled |


## How to
*Warning : Examples may contain offensive text*

### Quick Start

```javascript
const import profam from 'profam';

//Initialize
let profam = new profam();

//Assuming you are hosting languages on your own, you will need to specify a get-url mockup.
profam.profanity.localesUrlMockup = '/locales/[locale].json';

//Now that you have a get-url mockup you can start adding languages, and profam will take care of the rest.
profam.profanity.setLocales('en');

//Now english is added, bad-words in english will be replaced with the default mode's text. To change it:
profam.profanity.setModes('funny');

//Bad-words will be replaced with funny words using funny mode.
profam.process('Go to hell!'); // returns-> Go to unicorn.


// ---> Done! Now bad-words in english will be censored! Lets say you want to add a custom language:
profam.profanity.setLocales('customLanguage', true);        // -> 2nd param: marks it as custom
//OR
profam.profanity.setLocales('customLanguage', true, true);  // -> 3rd param: simply *adds* a new language, instead of replacing english.

//Adding words to your custom language:
profam.profanity.addWords('customLanguage', ['badword']);
```


## In-Depth all methods -> coming soon
