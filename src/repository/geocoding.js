const axios = require("axios").default;
const find = require("lodash/find");

module.exports = (latitude, longitude) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.GEOCODING_API_KEY}`;
  // console.log(url)
  return axios.get(url).then(({ data: { results } }) => {
    const { address_components } = find(results, {
      types: ["administrative_area_level_1"],
    });
    const country = find(address_components, { types: ["country"] });
    const locality = find(address_components, {
      types: ["administrative_area_level_1"],
    });
    return { country, locality };
  });
};
