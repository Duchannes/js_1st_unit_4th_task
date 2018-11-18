const request = require('request-promise');
const readline = require('readline-sync');

const options = {
  method: 'GET',
  uri: 'http://services.groupkt.com/country/get/all',
  json: true
};

function getResponse (countryName) {
  request(options)
    .then(function (response) {
      const countries = response.RestResponse.result;
      const country = countries.filter((element) => {
        if ((element.name).toLowerCase() === countryName.toLowerCase()) {
          return element;
        }
      })[0];
      if (country) {
        printInfo(country);
      } else throw new Error('Cannot find "' + countryName + '" in the country list');
    })
    .catch(function (err) {
      console.log(err.message);
    });
}

function findCountry () {
  const country = readline.question('Input country name:\n');
  getResponse(country);
}

function printInfo (country) {
  console.log('------------');
  Object.keys(country).forEach(key => {
    console.log(key + ': ' + country[key]);
  });
  console.log('------------');
}

findCountry();
