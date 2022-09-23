const addition = require('./addition');

test('adds 4 + 5 to equal 9', () => {
  expect(addition(4, 5)).toBe(9);
});