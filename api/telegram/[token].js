const axios = require('axios').default
const get = require('lodash/get')

module.exports = (req, res) => {
  const { token, ...query } = req.query
  const from = get(req, 'body.message.from', {})
  if (!token) throw new Error('token is required')
  if (token !== process.env.TELEGRAM_TOKEN) throw new Error('token not match')

  const reply = { chat_id: from.id, text: 'welcome!' }
  axios.post('/sendMessage', reply)
  res.json({
    body: req.body,
    query: query,
    cookies: req.cookies
  })
}
