const soap = require('strong-soap').soap;
const fs = require('fs');
const _ = require('lodash');
const dates = require('./dates.js');
const url = `https://www.wcc.nrcs.usda.gov/awdbWebService/services?WSDL`;
const { firebaseRef } = require('./firebase.js');
// const stations = ["302:OR:SNTL", "1141:CO:SNTL"];  use these two stations for testing purposes;


function getAllSnotelStations() {
  return new Promise((resolve, reject) => {
    firebaseRef.child('allStations').once('value').then((snap) => {
      resolve(snap.val());
    }).catch((e) => {
      reject(e);
    })
  });
}

// Should return an array of objects with necessary info
function getStationMetadata(client, stationTriplets) {
  return new Promise((resolve, reject) => {
    client.getStationMetadataMultiple({ stationTriplets }, (err, res, envelope, soapHeader) => {
      if (err) {
        reject(err);
      } else {
        resolve(res["return"]);
      }
    });
  });
}

// Should return an array of objects with necessary info
function getData(client, stations) {
  const endDate = dates.getEndDate();
  const beginDate = dates.getBeginDate();

  return new Promise((resolve, reject) => {
    client.getData({
      stationTriplets: stations,
      elementCd: 'SNWD',
      ordinal: 1,
      duration: 'DAILY',
      getFlags: false,
      alwaysReturnDailyFeb29: false,
      beginDate,
      endDate
    }, (err, res, envelope, soapHeader) => {
      if (err) {
        reject(err);
      } else {
        resolve(res["return"]);
      }
    });
  });
}

function mergeArrays(a1, a2) {
  var newArray = _.map(a1, function(obj){
    return _.extend(obj, _.find(a2, { stationTriplet: obj.stationTriplet }))
  });
  return newArray;
}


// getAllSnotelStations().then((res) => {
//   const stations = res;
//
//   soap.createClient(url, {}, (err, client) => {
//     getStationMetadata(client, stations).then((res) => {
//       var stationMetadata = res;
//       getData(client, stations).then((res) => {
//         var stationArray = mergeArrays(stationMetadata, res);
//         console.log(stationArray);
//       }).catch((e) => {
//         console.log(e);
//       });
//     }).catch((e) => {
//       console.log(e);
//     })
//   });
// }).catch((e) => {
//   console.log(e);
// });

getAllSnotelStations().then((res) => {
  console.log(res);
}).catch((e) => {
  console.log(e);
});


// getAllSnotelStations().then((res) => {
//   const stations = res;
//
//   soap.createClient(url, {}, (err, client) => {
//     getData(client, stations).then((res) => {
//       console.log(res);
//     }).catch((e) => {
//       console.log(e);
//     });
//   });
// }).catch((e) => {
//   console.log(e);
// });




// Each station, with static metadata ready immediately
