const soap = require('strong-soap').soap;
const _ = require('lodash');
const dates = require('./dates.js');
const url = `https://www.wcc.nrcs.usda.gov/awdbWebService/services?WSDL`;
const stations = ["302:OR:SNTL", "1141:CO:SNTL"];



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



soap.createClient(url, {}, (err, client) => {
  getStationMetadata(client, stations).then((res) => {
    var stationMetadata = res;
    getData(client, stations).then((res) => {
      var stationArray = mergeArrays(stationMetadata, res);
      console.log(stationArray);
    }).catch((e) => {
      console.log(e);
    });
  }).catch((e) => {
    console.log(e);
  })
});
