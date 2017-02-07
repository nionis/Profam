import axios from 'axios'
import Control from '../control'
import runMode from './runMode'
import { toArray, escapeSymbols } from '../utils'
import modes from './modes.json'


const makeUrl = (url: string, lang: string): string => (
  url.replace(/\[language\]/gi, lang)
)

const Profanity = (inputOpts: object): Function => {
  const ctrl: object = Control(inputOpts)

  const opts: object = {
    languages: new Map(),
    allWords: [],
    downloadUrl: '/languages/[language].json',
    modes,
    ...inputOpts,
  }

  const updateAllWords = (): array<string> => {
    const allWords = (
      getLanguages()
        .reduce((all, lang) => {
          const words = opts.languages.get(lang).data
          return all.concat(words)
        }, [])
        .map(word => escapeSymbols(word))
    )

    opts.allWords = allWords

    return allWords
  }

  const getDownloadUrl = (): string => opts.downloadUrl
  const setDownloadUrl = (url: string): string => (opts.downloadUrl = url)

  const getLanguages = (): array<string> => [...opts.languages.keys()]
  const addLanguages = (languages: mixed): promise => {
    const langsArray: array<string> = (
      toArray(languages)
        .filter(lang => !opts.languages.has(lang))
    )

    return Promise.all(
      langsArray.map(lang => (
        axios.get(makeUrl(getDownloadUrl(), lang))
          .then(res => res.data)
          .then((data) => {
            opts.languages.set(lang, {
              enabled: true,
              data,
            })

            updateAllWords()
            return getLanguages()[0]
          })
      )),
    )
  }
  const addCustomLanguages = (languages: mixed): array => {
    const langsArray: array<string> = (
      toArray(languages)
        .filter(lang => !opts.languages.has(lang))
    )

    langsArray.forEach(language => (
      opts.languages.set(language, {
        enabled: true,
        data: [],
      })
    ))

    updateAllWords()
    return getLanguages()
  }
  const removeLanguages = (languages: mixed): array<string> => {
    const langsArray: array<string> = toArray(languages)

    langsArray.forEach(lang => opts.languages.delete(lang))

    return getLanguages()
  }

  const getWords = (language: string): array<string> => {
    if (!opts.languages.has(language)) return false
    return opts.languages.get(language).data
  }
  const addWords = (language: string, words: array<string>): array<string> => {
    if (!opts.languages.has(language)) return false
    const wordsArray: array<string> = toArray(words)

    const languageObj = opts.languages.get(language)
    languageObj.data = [...new Set(languageObj.data.concat(wordsArray))]
    opts.languages.set(language, languageObj)

    updateAllWords()

    return getWords(language)
  }
  const removeWords = (language: string, words: array<string>): array<string> => {
    if (!opts.languages.has(language)) return false
    const wordsArray: array<string> = toArray(words)

    const languageObj = opts.languages.get(language)
    languageObj.data = languageObj.data.filter(word => !wordsArray.includes(word))

    updateAllWords()

    return getWords(language)
  }

  const getModes = (): array<string> => (
    opts.modes
      .filter(item => item.enabled)
      .map(item => item.name)
  )
  const setModes = (iModes: mixed): array<string> => {
    const modesArray: array<string> = (
      toArray(iModes)
        .filter(mode => opts.modes.find(item => item.name === mode))
    )

    // toggle
    opts.modes = opts.modes.map((item: object) => {
      const newItem = item
      if (modesArray.includes(newItem.name)) newItem.enabled = true
      else newItem.enabled = false
      return newItem
    })

    return getModes()
  }

  const run = (strs: mixed): object => {
    const strsArray: array<string> = toArray(strs)
    const enabledModes: array<string> = getModes()
    const words: array<string> = opts.allWords


    const getIndexes = (str, val) => {
      const indexes = []
      let i = -1

      while ((i = str.indexOf(val, i + 1)) !== -1) {
        indexes.push(i)
      }

      return indexes
    }

    return strsArray.map((str: string) => {
      const badWords = words.reduce((all, word) => {
        const indexes = getIndexes(str, word)
        const length = word.length

        if (indexes.length) {
          indexes.forEach((index) => {
            const replaced = enabledModes.reduce((item, mode) => {
              const obj = {
                mode,
                str: runMode(opts.modes, mode, word, length),
              }

              item.push(obj)

              return item
            }, [])

            all.push({
              word,
              index,
              length,
              replaced,
            })
          })
        }

        return all
      }, [])

      const final = enabledModes.reduce((item, mode) => {
        const modified = item
        let newStr = str

        badWords.forEach((badWord: Object) => {
          const replacedStr: string = badWord.replaced.find(v => v.mode === mode).str
          newStr = newStr.replace(new RegExp(badWord.word, 'i'), replacedStr)
        })

        modified[mode] = newStr

        return modified
      }, {})

      return final
    })
  }

  updateAllWords()

  return {
    ...ctrl,
    getDownloadUrl,
    setDownloadUrl,
    getLanguages,
    addLanguages,
    addCustomLanguages,
    removeLanguages,
    getWords,
    addWords,
    removeWords,
    getModes,
    setModes,
    run,
  }
}


export default Profanity
