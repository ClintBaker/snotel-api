const soap = require('strong-soap').soap;

const url = `https://www.wcc.nrcs.usda.gov/awdbWebService/services?WSDL`;
const options = {};

soap.createClient(url, options, (err, client) => {

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

    returnResults.map((obj) => {
      var resArray = [];
      var values = obj.values;
      var daily = {
        seventyTwoHr: 0,
        fourtyEightHr: 0,
        twentyFourHr: 0,
        stationTriplet: obj.stationTriplet,
        latitude: undefined,
        longitude: undefined,
        fipsStateNumber: undefined,
        elevation: undefined,
        countyName: undefined,
        temperature: undefined,
        name: undefined,
        stationDataTimeZone: undefined
      };

      var getStationMetadata = client.getStationMetadata;
      getStationMetadata({
        stationTriplet: obj.stationTriplet
      }, (err, res, envelope, soapHeader) => {
        // console.log(JSON.stringify(res));
        // console.log(JSON.stringify(res["return"], undefined, 2));
        var data = res["return"];
        daily = {
          ...daily,
          latitude: data["latitude"],
          longitude: data["longitude"],
          stationDataTimeZone: data["stationDataTimeZone"],
          name: data["name"],
          countyName: data["countyName"],
          fipsStateNumber: data["fipsStateNumber"],
          elevation: data["elevation"]
        }

        if (values[0] < values[3]) {
          daily.seventyTwoHr = values[3] - values[0];
          // console.log(`72hr snow accumulation = ${values[3] - values[0]}`)
        }

        if (values[0] < values[2]) {
          daily.fourtyEightHr = values[2] - values[0];
          daily.seventyTwoHr = values[2] - values[0];
        }

        if (values[0] < values[1]) {
          daily.twentyFourHr = values[1] - values[0];
          daily.fourtyEightHr = values[1] - values[0];
          daily.seventyTwoHr = values[1] - values[0];
        }

        resArray.push(daily);
      });
    });
    console.log('whatup bish')
  });
});
