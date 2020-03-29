const axios = require('axios').default
const api = require('./[token]')

jest.mock('axios')

beforeEach(() => {
  jest.restoreAllMocks()
})

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
  const req = {
    query: { token: 'foo:bar' },
    body: {
      message: {
        text: '/start'
      }
    }
  }
  const res = { json: jest.fn() }
  api(req, res)
  expect(res.json).toHaveBeenCalled()
})

test('should reply welcome on /start', () => {
  process.env.TELEGRAM_TOKEN = 'foo:bar'
  // axios.get.mockResolvedValue(reply)
  axios.post.mockImplementation(() => jest.fn())
  const req = {
    query: { token: 'foo:bar' },
    body: {
      message: {
        from: {
          id: 42, // chat_id (reply to it)
          language_code: 'en'
        },
        text: '/start'
      }
    }
  }
  const res = { json: jest.fn() }
  const reply = {
    chat_id: 42,
    text: 'welcome!'
  }

  api(req, res)
  expect(res.json).toHaveBeenCalled()
  expect(axios.post).toHaveBeenCalledWith('/sendMessage', reply)
})

test('should reply command not found', () => {
  process.env.TELEGRAM_TOKEN = 'foo:bar'
  // axios.get.mockResolvedValue(reply)
  axios.post.mockImplementation(() => jest.fn())
  const req = {
    query: { token: 'foo:bar' },
    body: {
      message: {
        text: '/command-not-found'
      }
    }
  }
  const res = { json: jest.fn() }

  expect(() => {
    api(req, res)
  }).toThrowError(/command not found/)
})
