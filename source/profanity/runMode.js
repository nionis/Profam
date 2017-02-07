// @flow

import { randomRange } from '../utils'

const emptyList = {
  data: [],
}


const modeFunny = (modes: Array<Object>): string => {
  const mode: Object = modes.find(item => item.name === 'funny') || emptyList
  const data: Array<string> = mode.data
  return data[randomRange(0, data.length)] || ''
}
const modeSpaces = (length: number): string => (
  ' '.repeat(length)
)
const modeBlack = (length: number): string => (
  '&#9632;'.repeat(length)
)
const modeAsterisksFull = (length: number): string => (
  '*'.repeat(length)
)
const modeAsterisksObscure = (word: string, length: number): string => (
  word[0] + '*'.repeat(length - 2) + word[word.length - 1]
)
const modeBeep = () => (
  'BEEP'
)
const modeGrawlix = (modes: Array<Object>, word: string): string => {
  const mode: Object = modes.find(item => item.name === 'grawlix') || emptyList
  const data: Array<string> = mode.data
  return word.split('').map(() => data[randomRange(0, data.length)]).join('')
}
const modeHide = (): string => (
  ''
)

const runMode = (modes: Array<Object>, mode: string, word: string, length: number): string => {
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
