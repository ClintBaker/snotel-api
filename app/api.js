const soap = require('strong-soap').soap;
const url = `https://www.wcc.nrcs.usda.gov/awdbWebService/services?WSDL`;

const requestArgs = {
  logicalAnd: false
};

const options = {};

soap.createClient(url, options, (err, client) => {

  var getStations = client.getStations;
  getStations(requestArgs, (err, res, env, header) => {
    // console.log('response envelope' + env);
    console.log(JSON.stringify(res));
  });

  var getData = client.getData;
  getData({
    stationTriplets: ["302:OR:SNTL", "1042:CO:SNTL"],
    elementCd: 'SNWD',
    ordinal: 1,
    duration: 'DAILY',
    getFlags: true,
    alwaysReturnDailyFeb29: false,
    beginDate: "2018-03-18",
    endDate: "2018-03-21"
  }, (err, res, envelope, soapHeader) => {
    // console.log(JSON.stringify(res));
    // console.log(res["return"].values);

    var returnResults = res["return"];
    var resArray = [];

    returnResults.map((obj) => {
      var values = obj.values;
      var daily = {
        seventyTwoHr: 0,
        fourtyEightHr: 0,
        twentyFourHr: 0,
        stationTriplet: obj.stationTriplet
      };

      if (values[0] < values[3]) {
        daily.seventyTwoHr = values[3] - values[0];
        // console.log(`72hr snow accumulation = ${values[3] - values[0]}`)
      } else {
        daily.seventyTwoHr = 0;
      }

      if (values[0] < values[2]) {
        daily.fourtyEightHr = values[2] - values[0];
      } else {
        daily.fourtyEightHr = 0;
      }

      if (values[0] < values[1]) {
        daily.twentyFourHr = values[1] - values[0];
      } else {
        daily.twentyFourHr = 0;
      }
      resArray.push(daily);
    });

    console.log(resArray);

  });


// NOT WORKING??????
  var getHourlyData = client.getHourlyData;
  getHourlyData({
    stationTriplets: "302:OR:SNTL",
    elementCd: 'SNWD',
    ordinal: 1,
    beginDate: "2010-01-01",
    endDate: "2010-01-31",
    beginHour: 2,
    endHour: 16
  }, (err, res, envelope, soapHeader) => {
      // console.log('***********');
      // console.log('***********');
      // console.log('***********');
      // console.log('***********');
      // console.log('***********');
      // console.log('***********');
      // console.log('***********');
      // console.log('***********');
      // console.log('***********');
      // console.log('***********');
      // console.log('***********');
      // console.log('***********');
      // console.log(JSON.stringify(res["return"].values[0], undefined, 2));

  });


  var getStationMetadata = client.getStationMetadata;
  getStationMetadata({
    stationTriplet: "302:OR:SNTL"
  }, (err, res, envelope, soapHeader) => {
    // console.log(JSON.stringify(res));
    // console.log(JSON.stringify(res, undefined, 2));
  });
});
