const axios = require('axios').default
const logger = require('pino')()
const loggerHttp = require('pino-http')({ logger })
const get = require('lodash/get')
const repository = require('../../repository')
const geocoding = require('../../repository/geocoding')

axios.defaults.baseURL = `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/`
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    logger.info(console)
    return config
  },
  function(error) {
    // Do something with request error
    logger.error(error)
    return Promise.reject(error)
  }
)

module.exports = (req, res) => {
  loggerHttp(req, res)
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
        const reply = { chat_id: from.id, text: 'welcome!', reply_markup: welcome }
        axios
          .post('/sendSticker', { ...sticker, chat_id: from.id }) //.then(({ data }) => res.json({ ...data }))
          .then(() => axios.post('/sendMessage', reply).then(({ data }) => res.json({ ...data })))
          .catch(error => res.json({ error }))

        break
      }
      case '/worldwide':
      case 'Worldwide Statistics': {
        repository.worldwide().then(statistics => {
          const text = template(locale, statistics)
          // console.log(text)
          const reply = { chat_id: from.id, text }
          axios
            .post('/sendMessage', reply)
            .then(({ data }) => res.json({ ...data }))
            .catch(error => res.json({ error }))
        })
        break
      }
      default: {
        if (text && text.startsWith('/')) {
          const reply = { chat_id: from.id, text: 'command not supported!' }
          return axios
            .post('/sendMessage', reply)
            .then(({ data }) => res.json({ ...data }))
            .catch(error => res.json({ error }))
        }
        if (location) {
          return geocoding(location.latitude, location.longitude)
            .then(({ country, locality }) => {
              repository
                .country(country.long_name)
                .then(statistics => {
                  const text = `${country.long_name}\n${template(locale, statistics)}`
                  console.log(text)
                  const reply = { chat_id: from.id, text }
                  axios
                    .post('/sendMessage', reply)
                    .then(({ data }) => res.json({ ...data }))
                    .catch(error => res.json({ error }))
                })
                .catch(error => res.json({ error }))
              repository
                .locality(locality.short_name)
                .then(statistics => {
                  const text = `${locality.long_name}\n${template(locale, statistics)}`
                  console.log(text)
                  const reply = { chat_id: from.id, text }
                  axios.post('/sendMessage', reply).then(({ data }) => res.json({ ...data }))
                })
                .catch(error => res.json({ error }))
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

const sticker = {
  sticker: 'CAACAgIAAxkBAANvXoIVU0H0D9p26ksAAeGsUiC1gRV6AAJaAAPANk8TC_wPT9xGGeEYBA'
}

const welcome = {
  keyboard: [
    [
      {
        text: 'Worldwide Statistics'
      }
    ],
    [
      {
        text: 'Local Statistics',
        request_location: true
      }
    ]
  ]
}

const template = (locale, { cases, confirmed, deaths, recovered }) => `
Cases: ${new Intl.NumberFormat(locale).format(cases)}
Confirmed: ${new Intl.NumberFormat(locale).format(confirmed)}
Deaths: ${new Intl.NumberFormat(locale).format(deaths)}
Recovered: ${new Intl.NumberFormat(locale).format(recovered)}
`
