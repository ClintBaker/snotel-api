const request = require('request');
const yargs = require('yargs');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch snowtel info',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;


function geoLocator(address) {
  const key = 'AIzaSyCVeCwLTOA6YU0cJI70SyO3t7W-p7ud9RM';
  const encodedAddress = encodeURIComponent(address);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log(error);
    } else {
      var lat = body.results[0].geometry.location.lat;
      var lng = body.results[0].geometry.location.lng;
      var address = body.results[0].formatted_address;
      console.log('GREAT SUCCESS');
      console.log(address);
    }
  });
}

geoLocator(address);
