# Profam
All in One Profanity and Spam Tool, supporting multiple languages and modes.

## Thanks to:
- [Shutterstock Project](https://github.com/shutterstock/List-of-Dirty-Naughty-Obscene-and-Otherwise-Bad-Words), for provading all the bad words!

## Tools Overview
Tool | Use
---- | ----
Profanity | Used to censor words using selected modes
Spam | Uses an algorithm to stop repeating characters


## How to
*Warning : Examples may contain offensive text*

### Quick Start

```javascript
// Initialize
import { profanity, spam } from 'profam'

// Profanity
// set download url
profanity.setDownloadUrl('https://static.gamingforgood.net/assets/profanityLocales/[language].json')

// Now that we have specified languages url you can start adding languages
profanity.addLanguages('en') // --> this is async returns a promise

// Now English is added, bad-words in English will be censored according to the mode selected
// To change profanity mode:
profanity.setModes('funny')

// Bad-words will be replaced with funny words using funny mode.
profanity.run('Go to hell!') // --> Go to unicorn!

// Adding custom words
profanity.addCustomLanguages('Klingon')

//Adding words to your custom language:
profanity.addWords('Klingon', ['Hu\'tegh', 'baktag'])

// Spam
spam.run('trolololololololololol') // --> trolol
```


## API

### Profanity Methods
| Method | Use |
| ----- | ----- |
| profanity.getDownloadUrl() | Returns download url |
| profanity.setDownloadUrl(string) | Sets download url |
| profanity.getLanguages() | Returns array of language downloaded |
| profanity.addLanguages(string/array) | Returns a promise and downlods languages |
| profanity.addCustomLanguages(string/array) | Adds custom languages |
| profanity.removeLanguages(string/array) | Removes languages |
| profanity.getWords(string(language)) | Returns bad-words used by language |
| profanity.addWords(string(language), string/array) | Adds words to language |
| profanity.removeWords(string(language), string/array) | Removes words in language |
| profanity.getModes() | Returns enabled modes |
| profanity.setModes(string/array) | Enables modes |
| profanity.run(string/array) | Returns array of object for each string keyed by mode used |

### Spam Tool
| Method | Use |
| ----- | ----- |
| spam.getFrequency() | Returns frequency used in algorithm |
| spam.setFrequency(number) | Sets frequency used in algorithm |
| spam.run(string/array) | Returns array of strings |


## Languages
| Name       | Code |
| ---------- | ---- |
| Arabic     | ar   |
| Chinese    | zh   |
| Czech      | cs   |
| Danish     | da   |
| Dutch      | nl   |
| English    | en   |
| Esperanto  | eo   |
| Finnish    | fi   |
| French     | fr   |
| German     | de   |
| Hindi      | hi   |
| Hungarian  | hu   |
| Italian    | it   |
| Japanese   | ja   |
| Klingon    | tlh  |
| Korean     | ko   |
| Norwegian  | no   |
| Persian    | fa   |
| Polish     | pl   |
| Portuguese | pt   |
| Russian    | ru   |
| Spanish    | es   |
| Swedish    | sv   |
| Thai       | th   |
| Turkish    | tr   |

## Modes
| Name | Output |
| ----- | ----- |
| asterisks-obscure | w**d!! |
| asterisks-full | ****!! |
| funny | unicorn!! |
| grawlix | !#%@!! |
| spaces | &nbsp;&nbsp;&nbsp;&nbsp;!! |
| black | &#9632;&#9632;&#9632;&#9632;!! |
| hide | !! |
| beep | BEEP!! |
