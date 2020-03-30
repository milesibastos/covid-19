const axios = require('axios').default
axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    console.log(config.url)
    return config
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error)
  }
)

// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    console.log(response.data)
    return response
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

const resources = {
  worldwide: () => {
    const response = { cases: 0, confirmed: 0, deaths: 0, recovered: 0 }
    const reducer = (accumulator, currentValue) => {
      accumulator.cases += currentValue.cases
      accumulator.confirmed += currentValue.confirmed
      accumulator.deaths += currentValue.deaths
      accumulator.recovered += currentValue.recovered

      return accumulator
    }
    return axios
      .get('https://covid19-brazil-api.now.sh/api/report/v1/countries')
      .then(({ data: { data } }) => data.reduce(reducer, response))
  },
  country: name => {
    return axios
      .get(`https://covid19-brazil-api.now.sh/api/report/v1/${name.toLowerCase()}`)
      .then(({ data: { data } }) => data)
  },
  locality: name => {
    return axios
      .get(`https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${name.toLowerCase()}`)
      .then(({ data }) => data)
  }
}

module.exports = resources
