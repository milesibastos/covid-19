const axios = require('axios').default
const get = require('lodash/get')
const repository = require('../../repository')
const geocoding = require('../../repository/geocoding')

axios.defaults.baseURL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/`

module.exports = (req, res) => {
  const { token, ...query } = req.query
  const from = get(req, 'body.message.from', {})
  const text = get(req, 'body.message.text')
  const location = get(req, 'body.message.location')
  const locale = get(req, 'body.message.from.language_code', 'en')
  if (!token) throw new Error('token is required')
  if (token !== process.env.TELEGRAM_TOKEN) throw new Error('token not match')

  try {
    switch (text) {
      case '/start': {
        const reply = { chat_id: from.id, text: 'welcome!' }
        axios.post('/sendMessage', reply).then(({ data }) => res.json({ ...data }))
        break
      }
      case '/worldwide': {
        repository.worldwide().then(statistics => {
          const text = template(locale, statistics)
          // console.log(text)
          const reply = { chat_id: from.id, text }
          axios.post('/sendMessage', reply).then(({ data }) => res.json({ ...data }))
        })
        break
      }
      default: {
        if (text && text.startsWith('/')) {
          const reply = { chat_id: from.id, text: 'command not supported!' }
          return axios.post('/sendMessage', reply).then(({ data }) => res.json({ ...data }))
        }
        if (location) {
          return geocoding(location.latitude, location.longitude)
            .then(({ country, locality }) => {
              repository.country(country.long_name).then(statistics => {
                const text = `${country.long_name}\n${template(locale, statistics)}`
                console.log(text)
                const reply = { chat_id: from.id, text }
                axios.post('/sendMessage', reply).then(({ data }) => res.json({ ...data }))
              })
              repository.locality(locality.short_name).then(statistics => {
                const text = `${locality.long_name}\n${template(locale, statistics)}`
                console.log(text)
                const reply = { chat_id: from.id, text }
                axios.post('/sendMessage', reply).then(({ data }) => res.json({ ...data }))
              })
            })
            .catch(error => res.json({ error }))
        }
        axios
          .post('/sendMessage', { chat_id: from.id, text })
          .then(({ data }) => res.json({ ...data }))
          .catch(({ data }) => res.json({ ...data }))
      }
    }
  } catch (error) {
    res.json({ error })
  }
}

const template = (locale, { cases, confirmed, deaths, recovered }) => `
Cases: ${new Intl.NumberFormat(locale).format(cases)}
Confirmed: ${new Intl.NumberFormat(locale).format(confirmed)}
Deaths: ${new Intl.NumberFormat(locale).format(deaths)}
Recovered: ${new Intl.NumberFormat(locale).format(recovered)}
`
