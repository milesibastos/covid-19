const axios = require("axios").default;
const parse = require("csv-parse/lib/sync");
const groupBy = require("lodash/groupBy");
const sortBy = require("lodash/sortBy");
const filter = require("lodash/filter");

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // console.log(response.data);
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

const resources = {
  worldwide: () => {
    const response = { cases: 0, confirmed: 0, deaths: 0, recovered: 0 };
    const reducer = (accumulator, currentValue) => {
      accumulator.cases += currentValue.cases;
      accumulator.confirmed += currentValue.confirmed;
      accumulator.deaths += currentValue.deaths;
      accumulator.recovered += currentValue.recovered;

      return accumulator;
    };
    return axios
      .get("https://covid19-brazil-api.now.sh/api/report/v1/countries")
      .then(({ data: { data } }) => data.reduce(reducer, response));
  },
  country: (name) => {
    switch (name.toLowerCase()) {
      case "united states": {
        return axios
          .get(
            "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"
          )
          .then((response) => {
            const initial = { cases: 0, confirmed: 0, deaths: 0, recovered: 0 };
            const reducer = (accumulator, currentValue) => {
              accumulator.cases += parseInt(currentValue.cases);
              accumulator.confirmed += parseInt(currentValue.confirmed);
              accumulator.deaths += parseInt(currentValue.deaths);
              accumulator.recovered += parseInt(currentValue.recovered);

              return accumulator;
            };

            const records = parse(response.data, {
              columns: true,
              skip_empty_lines: true,
            });
            const states = groupBy(records, "state");
            const dataset = [];
            for (const key in states) {
              const state = states[key];
              const sorted = sortBy(state, "date").reverse();
              dataset.push(sorted[0]);
            }
            return dataset.reduce(reducer, initial);
          });
      }

      default:
        return axios
          .get(
            `https://covid19-brazil-api.now.sh/api/report/v1/${name.toLowerCase()}`
          )
          .then(({ data: { data } }) => data);
    }
  },
  state: (country, state) => {
    switch (country.long_name.toLowerCase()) {
      case "united states": {
        return axios
          .get(
            "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"
          )
          .then((response) => {
            const records = parse(response.data, {
              columns: true,
              skip_empty_lines: true,
            });
            const dataset = filter(
              records,
              (rec) => rec.state.toLowerCase() === state.long_name.toLowerCase()
            );
            const sorted = sortBy(dataset, "date").reverse();
            return sorted[0];
          });
      }
      default:
        return axios
          .get(
            `https://covid19-brazil-api.now.sh/api/report/v1/brazil/uf/${state.short_name.toLowerCase()}`
          )
          .then(({ data }) => data);
    }
  },
};

module.exports = resources;
