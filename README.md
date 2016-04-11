# Profam
All in One Profanity and Spam Tool, supporting multiple languages and modes.
*Atm works only if you have babel on client, compile coming soon.*

## Tools Available
| Tool | Use | Default Status |
| --- | --- | --- |
| Profanity | Used to censor words using the selected modes. | Enabled |
| Spam | Uses an algorithm to stop repeating characters. | Disabled |


## How to
*Warning : Examples may contain offensive text*

### Quick Start

```javascript
import profam from 'profam';

//Initialize
let profam = new profam();

//Assuming you are hosting languages on your own, you will need to specify a get-url mockup.
profam.profanity.localesUrlMockup = '/locales/[locale].json';

//Now that you have a get-url mockup you can start adding languages, and profam will take care of the rest.
profam.profanity.setLocales('en');

//Now english is added, bad-words in english will be replaced with the default mode's text. To change it:
profam.profanity.setModes('funny');

//Bad-words will be replaced with funny words using funny mode.
profam.process('Go to hell!'); // returns-> Go to unicorn!.


// ---> Done! Now bad-words in english will be censored! Lets say you want to add a custom language:
profam.profanity.setLocales('customLanguage', true);        // -> 2nd param: marks it as custom
//OR
profam.profanity.setLocales('customLanguage', true, true);  // -> 3rd param: simply *adds* a new language, instead of replacing english.

//Adding words to your custom language:
profam.profanity.addWords('customLanguage', ['badword']);
```


## In-Depth all methods

### Profanity Tool
|	Method	|	Parameters	|	Use	|	Default	|
|	-----	|	-----	|	-----	|	-----	|
|	profanity.enable =	|	Boolean	|	Enable or disable profanity	|	TRUE	|
|	profanity.localesUrlMockup =	|	String -> must include [locale]	|	Replaces [locale] with the language you want to download. Ex: example.com/locales/[locale].js	|	null	|
|	profanity.setLocales(\<string/array\>)	|	<ol><li>Locale(s)</li></ol>	|	Add the languages you wonna look for bad-words	|		|
|	profanity.addWords(\<string\>, \<array\>)	|	<ol><li>Locale</li></ol><ol><li>Words</li></ol>	|	Add new words in selected locale.	|		|
|	profanity.removeWords(\<string\>, \<array\>)	|	<ol><li>Locale</li></ol><ol><li>Words</li></ol>	|	Remove words from locale.	|		|
|	profanity.setModes(\<string/array\>, \<true/false\>, \<true/false\>	|	<ol><li>Mode(s)</li><li>is custom</li><li>keep existing</li></ol>	|	Set Modes	|	<ol><li>asterisks-obscure</li><li>false</li><li>false</li></ol>	|
|	profanity.getLocales()	|		|	Get Locales	|		|
|	profanity.getLocalesEnabled()	|		|	Get Locales Enabled	|		|
|	profanity.getModes()	|		|	Get Modes	|		|
|	profanity.getModesEnabled()	|		|	Get Modes Enabled	|		|

### Spam Tool
|	Method	|	Parameters	|	Use	|	Default	|
|	-----	|	-----	|	-----	|	-----	|
|	spam.enable	|	Boolean	|	Enable or disable Spam	|	FALSE	|

### Profam
|	Method	|	Parameters	|	Use	|	Default	|
|	-----	|	-----	|	-----	|	-----	|
|	.proceed(\<string\>)	|	String	|	Return censored string	|		|
