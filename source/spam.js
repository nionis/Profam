// @flow

import { toArray } from './utils'


const makeBundle = (chars: Array<string>, index: number, f: number) => {
  const bundleChars: Array<string> = []

  for (let c = 0; c < f; c += 1) {
    const char: string = chars[index + c] || ''
    bundleChars.push(char)
  }

  const joined: string = bundleChars.join('')

  return joined
}
const bundleCheck = (str: string, frequency: number): string => {
  const chars: Array<string> = str.split('').reverse()
  const checkedChars: Array<string> = []

  chars.map((char: string, index: number): boolean => {
    const bundle: string = makeBundle(chars, index, frequency)
    const future: string = makeBundle(chars, index + frequency, frequency)

    if (bundle !== future) checkedChars.push(char)

    return true
  })

  const checked: string = checkedChars.reverse().join('')

  return checked
}

const regexpCheck = (str: string): string => (
  str.replace(/(.)\1{3,}/g, '$1$1$1')
)

const Spam = (inputOpts: Object = {}): Object => {
  const opts: {
    frequency: number;
  } = {
    frequency: 3,
    ...inputOpts,
  }

  const getFrequency: number = () => opts.frequency
  const setFrequency: number = frequency => (opts.frequency = frequency)
  const run = (strs: any = []): Array<string> => {
    const strsArray: Array<string> = toArray(strs)

    if (!getFrequency()) return strsArray

    const checked: Array<string> = (
      strsArray
        .map(str => bundleCheck(str, getFrequency()))
        .map(str => regexpCheck(str))
    )

    return checked
  }

  return {
    getFrequency,
    setFrequency,
    run,
  }
}


export default Spam
