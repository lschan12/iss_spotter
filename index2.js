const nextISSTimesForMyLocation = require("./iss_promised");

const printPassTimes = (data) => {
  for (let passTime of data) {
    let datetime = new Date(0);
    datetime.setUTCSeconds(passTime.risetime);
    const duration = passTime.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((response) => printPassTimes(response))
  .catch((err) => console.log(err));