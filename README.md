# Profam
All in One Profanity and Spam Tool, supporting multiple languages and modes.

## Thanks to:
- [Shutterstock Project](https://github.com/shutterstock/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words), for provading all the bad words!

## Tools Overview
Tool | Use | Default Status
---- | ---- | ----
Profanity | Used to censor words using selected modes | Enabled
Spam | Uses an algorithm to stop repeating characters | Disabled


## How to
*Warning : Examples may contain offensive text*

### Quick Start

```javascript
import Profam from 'profam';

// Initialize
const { profanity, spam } = new Profam()

// Profanity
profanity.setLanguagesUrl('/languages/[language].json')

// Now that we have specified languages url/dir you can start adding languages
profanity.setLanguages('en')

// Now English is added, bad-words in English will be censored according to the mode selected
// To change profanity mode:
profanity.setModes('funny')

// Bad-words will be replaced with funny words using funny mode.
profanity.run('Go to hell!') // --> Go to unicorn!

// Adding custom words
profanity.setLanguages('customLanguage', true) // -> 2nd param: marks it as custom

//Adding words to your custom language:
profanity.addWords('customLanguage', ['badword'])
```


## In-Depth all methods

### Profanity Methods
| Method | Parameters | Use | Default | Returns |
| ----- | ----- | ----- | ----- | ----- |
| profanity.enable() | None | Enable profanity | None | Boolean |
| profanity.disable() | None | Disable profanity | None | Boolean |
| profanity.status() | None | Get profanity status | None | Boolean |
| profanity.setLanguagesUrl(a=string) | Url | Replaces "[language]" with the language you want to download. Ex: yoursite.com/languages/[language].json | "/languages/[language].json" | Boolean |
| profanity.setLanguages(a=string/array, b=boolean, c=boolean> | Language(s) name, is custom language, remove other languages  | Add the languages you want to search for bad-words | [], false, false | Promise |
| profanity.addWords(a=string, b=array, c=boolean) | Language, Words, Remove other words | Add new words in selected language. | undefined, [], false | Boolean |
| profanity.removeWords(a=string, b=array) | Language, Words | Remove words from language. | None | Boolean |
| profanity.getModes() | None | Get Modes | None | Boolean |
| profanity.setModes(a=string/array) | Mode(s) | Set Modes | asterisks-obscure | Boolean |
| profanity.getLanguages() | None | Get Languages | None | Boolean |
| profanity.getLanguagesEnabled() | None | Get Languages Enabled | None | Boolean |

### Spam Tool
| Method | Parameters | Use | Returns |
| ----- | ----- | ----- | ----- |
| spam.enable() | None | Enable spam | Boolean |
| spam.disable() | None | Disable spam | Boolean |
| spam.status() | None | Get spam status | Boolean |
| spam.setFrequency() | Frequency | Set frequency | Integer |
| spam.getFrequency() | None | Get frequency | Integer |
