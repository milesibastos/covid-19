const axios = require("axios").default;
const parse = require("csv-parse/lib/sync");
const groupBy = require("lodash/groupBy");
const sortBy = require("lodash/sortBy");

const repository = require("./index");

test.skip("should list worldwide", async () => {
  const response = await repository("worldwide");
  console.log(response);
  expect(response).not.toBeNull();
});

// https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv

test.skip("should donwload us-states", async () => {
  const response = await axios.get(
    "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"
  );
  const records = parse(response.data, {
    columns: true,
    skip_empty_lines: true,
  });
  console.log(records);
  expect(response.data).not.toBeNull();
});

test("should sumary us-states", async () => {
  const response = await axios.get(
    "https://raw.githubusercontent.com/nytimes/covid-19-data/master/us-states.csv"
  );
  const records = parse(response.data, {
    columns: true,
    skip_empty_lines: true,
  });
  const states = groupBy(records, "state");
  const dataset = [];
  for (const key in states) {
    if (states.hasOwnProperty(key)) {
      const state = states[key];
      const sorted = sortBy(state, "date").reverse();
      dataset.push(sorted[0]);
    }
  }
  // console.log(dataset);
  expect(response.data).not.toBeNull();
});
