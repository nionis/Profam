import Spam from '../source/spam'

const spam = Spam({
  frequency: 6,
})
const str = 'aoeaoeaoeaoeaoeaoeaoe'


// Input opts
test('frequency', () => {
  expect(spam.getFrequency()).toEqual(6)
})

// Modify opts
test('frequency = 3', () => {
  spam.setFrequency(3)

  expect(spam.getFrequency()).toEqual(3)
})

// Run
test('run', () => {
  expect(spam.run(str)).toEqual(['aoeao'])
})
