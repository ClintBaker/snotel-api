const request = require('request');

function getStations() {
  const url = 'http://api.powderlin.es/stations';
  request({
    url: url,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log(error);
    } else {
      console.log(JSON.stringify(body, undefined, 2));
    }
  });

}

getStations()
