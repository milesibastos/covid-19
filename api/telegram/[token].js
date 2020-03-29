const axios = require('axios').default
const get = require('lodash/get')

axios.defaults.baseURL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/`

module.exports = (req, res) => {
  const { token, ...query } = req.query
  const from = get(req, 'body.message.from', {})
  const text = get(req, 'body.message.text')
  if (!token) throw new Error('token is required')
  if (token !== process.env.TELEGRAM_TOKEN) throw new Error('token not match')

  switch (text) {
    case '/start':
      const reply = { chat_id: from.id, text: 'welcome!' }
      axios.post('/sendMessage', reply).then(({ data }) => res.json({ ...data }))
      break

    default:
      throw new Error('command not found')
  }
}
