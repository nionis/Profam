import Control from './control'
import { toArray } from './utils'


const makeBundle = (chars: array<string>, index: number, f: number) => {
  const bundleChars: array<string> = []

  for (let c = 0; c < f; c += 1) {
    const char: string = chars[index + c] || ''
    bundleChars.push(char)
  }

  const joined: string = bundleChars.join('')

  return joined
}
const bundleCheck = (str: string, frequency: number): string => {
  const chars: array<string> = str.split('').reverse()
  const checkedChars: array<string> = []

  chars.map((char: string, index: number) => {
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

const Spam = (inputOpts: object): Function => {
  const ctrl: object = Control(inputOpts)

  const opts: object = {
    frequency: 3,
    ...inputOpts,
  }

  const getFrequency: number = () => opts.frequency
  const setFrequency: number = frequency => (opts.frequency = frequency)
  const run = (strs: mixed = []): string => {
    const strsArray: array<string> = toArray(strs)

    if (!ctrl.isEnabled() || !getFrequency()) return strsArray

    const checked: array<string> = (
      strsArray
        .map(str => bundleCheck(str, getFrequency()))
        .map(str => regexpCheck(str))
    )

    return checked
  }

  return {
    ...ctrl,
    getFrequency,
    setFrequency,
    run,
  }
}


export default Spam
