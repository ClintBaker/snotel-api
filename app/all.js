const soap = require('strong-soap').soap;
const fs = require('fs');
const url = `https://www.wcc.nrcs.usda.gov/awdbWebService/services?WSDL`;
const { firebaseRef } = require('./firebase.js');

const requestArgs = {
  logicalAnd: false
};

const options = {};

soap.createClient(url, options, (err, client) => {

  var getStations = client.getStations;
  getStations(requestArgs, (err, res, env, header) => {
    // console.log('response envelope' + env);
    var all = res["return"];
    var final = [];
    all.map((str) => {
      if (str.substr(str.length - 4) == 'SNTL') {
        final.push(str);
      }
    });
    // var json = JSON.stringify({ stations: final });
    // fs.writeFile('allstations.json', json, 'utf8', (err) => {
    //   console.log('yeah buddy');
    // });

    firebaseRef.child('allStations').set({ sntl: final }).then(() => {
      console.log('task completed');
    }).catch((e) => {
      console.log(e);
    });
  });
});


// function getAllSnotelStations() {
//   return new Promise((resolve, reject) => {
//     fs.readFile('allstations.json', 'utf8', (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         var obj = JSON.parse(data);
//         resolve(obj.stations);
//       }
//     });
//   });
// }
