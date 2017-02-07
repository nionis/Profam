import Profanity from '../source/profanity'

const dlUrl = 'https://static.gamingforgood.net/assets/profanityLocales/[language].json'
const str = 'hellobadwordnasty nasty word'
const profanity = Profanity()


// downloadUrl
test(`setDownloadUrl to ${dlUrl}`, () => {
  expect(profanity.setDownloadUrl(dlUrl)).toEqual(dlUrl)
})
test(`getDownloadUrl -> ${dlUrl}`, () => {
  expect(profanity.getDownloadUrl()).toEqual(dlUrl)
})

// languages
test('addLanguage en', () => (
  profanity.addLanguages('en')
    .then(res => expect(res).toEqual(['en']))
))
test('addCustomLanguage kappaLang', () => {
  expect(profanity.addCustomLanguages('kappaLang')).toEqual([
    'en',
    'kappaLang',
  ])
})
test('removeLanguage', () => {
  expect(profanity.removeLanguages('en')).toEqual(['kappaLang'])
})
test('getLanguages', () => {
  expect(profanity.getLanguages()).toEqual(['kappaLang'])
})

// words
test('addWords nasty, bad, hehe', () => {
  expect(profanity.addWords('kappaLang', ['nasty', 'bad', 'hehe']))
    .toEqual(['nasty', 'bad', 'hehe'])
})
test('removeWords hehe', () => {
  expect(profanity.removeWords('kappaLang', 'hehe'))
    .toEqual(['nasty', 'bad'])
})
test('getWords nasty, bad', () => {
  expect(profanity.getWords('kappaLang'))
    .toEqual(['nasty', 'bad'])
})

// modes
test('getModes', () => {
  expect(profanity.getModes())
    .toEqual(['asterisks-obscure'])
})
test('setModes', () => {
  expect(profanity.setModes([
    'asterisks-obscure',
    'beep',
  ]))
    .toEqual([
      'asterisks-obscure',
      'beep',
    ])
})

// run
test(`censor ${str}`, () => {
  expect(profanity.run(str)).toEqual([
    {
      "asterisks-obscure": "hellob*dwordn***y n***y word",
      "beep": "helloBEEPwordBEEP BEEP word",
    },
  ])
})
