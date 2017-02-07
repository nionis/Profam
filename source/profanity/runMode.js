import { randomRange } from '../utils'


const modeFunny = (modes: array<Object>) => {
  const list = modes.find(item => item.name === 'funny').data
  return list[randomRange(0, list.length)] || ''
}
const modeSpaces = (length: number) => (
  ' '.repeat(length)
)
const modeBlack = (length: number) => (
  '&#9632;'.repeat(length)
)
const modeAsterisksFull = (length: number) => (
  '*'.repeat(length)
)
const modeAsterisksObscure = (word: string, length: number) => (
  word[0] + '*'.repeat(length - 2) + word[word.length - 1]
)
const modeBeep = () => (
  'BEEP'
)
const modeGrawlix = (modes: array<Object>, word: string) => {
  const list = modes.find(item => item.name === 'grawlix').data
  return word.split('').map(() => list[randomRange(0, list.length)]).join('')
}
const modeHide = () => (
  ''
)

const runMode = (modes: array<Object>, mode: string, word: string, length: number) => {
  switch (mode) {
    case 'funny': {
      return modeFunny(modes)
    }
    case 'spaces': {
      return modeSpaces(length)
    }
    case 'black': {
      return modeBlack(length)
    }
    case 'asterisks-full': {
      return modeAsterisksFull(length)
    }
    case 'asterisks-obscure': {
      return modeAsterisksObscure(word, length)
    }
    case 'beep': {
      return modeBeep()
    }
    case 'grawlix': {
      return modeGrawlix(modes, word)
    }
    case 'hide': {
      return modeHide()
    }
    default: {
      return modeGrawlix(modes, word)
    }
  }
}


export default runMode
