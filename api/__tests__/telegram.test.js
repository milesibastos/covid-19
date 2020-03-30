const axios = require('axios').default
const merge = require('lodash/merge')
const set = require('lodash/set')
const api = require('../telegram/[token]')
const repository = require('../../repository')

jest.mock('axios')
jest.mock('../../repository')

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
  jest.resetAllMocks()
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
  axios.post.mockResolvedValue({})
  const request = merge({}, req, set({}, 'body.message.text', '/command-not-found'))
  const text = 'command not supported!'
  const reply = { chat_id: 42, text }
  const res = { json: jest.fn() }

  api(request, res)
  expect(axios.post).toHaveBeenCalledWith('/sendMessage', reply)
})

test('should reply worldwide statistics on /worldwide', () => {
  axios.post.mockResolvedValue({})
  repository.mockResolvedValue({ cases: 0, confirmed: 0, deaths: 0, recovered: 42 })
  const request = merge({}, req, set({}, 'body.message.text', '/worldwide'))
  const res = { json: jest.fn() }
  const reply = ''

  api(request, res)
  // expect(axios.post).toHaveBeenCalledWith('/sendMessage', reply)
})
