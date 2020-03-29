const axios = require('axios').default

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
  }
}

module.exports = key => {
  const resource = resources[key]
  return resource()
}
