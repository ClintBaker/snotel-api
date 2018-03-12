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


function closestStations(lat, lng) {
  request({
    url: `http://api.powderlin.es/closest_stations?lat=${lat}&lng=${lng}&data=true&days=1&count=1`,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log(error);
    } else {
      var twentyFourHourSnowfall = body[0].data[0]["Change In Snow Depth (in)"];

      if (twentyFourHourSnowfall > 1) {

      } else {
        twentyFourHourSnowfall = 0;
      }

      var station = {
        elevation: body[0].station_information.elevation,
        name: body[0].station_information.name,
        date: body[0].data[0]["Date"],
        snowDepth: body[0].data[0]["Snow Depth (in)"],
        twentyFourHourSnowfall
      };
      console.log(station);
    }
  });
}


module.exports = {
  getStations,
  closestStations
};
