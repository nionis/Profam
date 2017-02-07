import {
  removeFromArray,
  toArray,
  randomRange,
  escapeSymbols,
} from '../source/utils'


// removeFromArray
test('removeFromArray: remove true values in array', () => {
  expect(removeFromArray([false, false, true, false], true)).toEqual([false, false, false])
})

// toArray
test('convert integer to array', () => {
  expect(toArray(1)).toEqual([1])
})
test('convert string to array', () => {
  expect(toArray('hello')).toEqual(['hello'])
})
test('convert array to array', () => {
  expect(toArray([1, 2, 3])).toEqual([1, 2, 3])
})
test('convert undefined to array', () => {
  expect(toArray()).toEqual([])
})

// randomRange
test('x > 0 && x < 101', () => {
  const x = expect(randomRange())

  x.toBeGreaterThanOrEqual(0)
  x.toBeLessThan(101)
})
test('x === 51', () => {
  expect(randomRange(50, 51)).toBe(50)
})
