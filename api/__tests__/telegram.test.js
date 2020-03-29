const axios = require('axios').default
const merge = require('lodash/merge')
const set = require('lodash/set')
const api = require('../telegram/[token]')

jest.mock('axios')

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

beforeEach(() => {
  jest.restoreAllMocks()
  process.env.TELEGRAM_TOKEN = 'foo:bar'
})

test('should be a function', () => {
  expect(api).toBeInstanceOf(Function)
})

test('token is required', () => {
  const req = { query: {} }

  expect(() => api(req)).toThrowError(/token is required/)
})

test('token not match', () => {
  const req = { query: { token: 'foo' } }

  expect(() => api(req)).toThrowError(/token not match/)
})

test('token should be valid', () => {
  axios.post.mockResolvedValue({})
  const res = { json: jest.fn() }

  api(req, res)
  expect(axios.post).toHaveBeenCalled()
})

test('should reply welcome on /start', () => {
  axios.post.mockResolvedValue({})
  const res = { json: jest.fn() }
  const reply = { chat_id: 42, text: 'welcome!' }

  api(req, res)
  expect(axios.post).toHaveBeenCalledWith('/sendMessage', reply)
})

test('should reply command not found', () => {
  axios.post.mockImplementation(() => jest.fn())
  const request = merge({}, req, set({}, 'body.message.text', '/command-not-found'))
  const res = { json: jest.fn() }

  expect(() => {
    api(request, res)
  }).toThrowError(/command not found/)
})