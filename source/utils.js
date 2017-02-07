import whatIs from 'type-name'


export const removeFromArray = (arr: array = [], item: mixed): array => (
  arr.filter((x: mixed) => x !== item)
)

export const toArray = (item: mixed = null): array => {
  const is: string = whatIs(item)
  const isArray: boolean = is === 'Array'
  const isNumber: boolean = is === 'number'
  const isString: boolean = is === 'string'

  if (isArray) return item
  if (isNumber || isString) return [item]
  return []
}

export const randomRange = (min: number = 0, max: number = 101): number => (
  Math.floor((Math.random() * (max - min)) + min)
)

export const escapeSymbols = (str: string): string => (
  str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
)
