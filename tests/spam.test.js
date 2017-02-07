import Spam from '../source/spam'

const spam = Spam({
  enabled: true,
  frequency: 6,
})
const str = 'aoeaoeaoeaoeaoeaoeaoe'

// Input opts
test('enabled', () => {
  expect(spam.isEnabled()).toEqual(true)
})
test('frequency', () => {
  expect(spam.getFrequency()).toEqual(6)
})

// Modify opts
test('disable', () => {
  spam.disable()

  expect(spam.isEnabled()).toEqual(false)
})
test('frequency = 3', () => {
  spam.setFrequency(3)

  expect(spam.getFrequency()).toEqual(3)
})

// Run
test('run when disabled', () => {
  expect(spam.run(str)).toEqual([str])
})
test('run when enabled', () => {
  spam.enable()

  expect(spam.run(str)).toEqual(['aoeao'])
})
