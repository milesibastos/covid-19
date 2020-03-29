const api = require('./[token]')

test('should be a function', () => {
  expect(api).toBeInstanceOf(Function)
})

test('token is required', () => {
  const req = { query: {} }
  const res = { json: jest.fn }
  expect(() => {
    api(req, res)
  }).toThrowError(/token is required/)
})

test('token not match', () => {
  process.env.TELEGRAM_TOKEN = 'foo'
  const req = { query: { token: 'bar' } }
  const res = { json: jest.fn() }
  expect(() => {
    api(req, res)
  }).toThrowError(/token not match/)
})

test('token should be valid', () => {
  process.env.TELEGRAM_TOKEN = 'foo:bar'
  const req = { query: { token: 'foo:bar' } }
  const res = { json: jest.fn() }
  api(req, res)
  expect(res.json).toHaveBeenCalled()
})
