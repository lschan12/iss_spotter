const {nextISSTimesForMyLocation} = require("./iss");


// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned IP:", ip);
// });

// fetchCoordsByIP("24.86.26.138", (error, coordinates) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(coordinates);
//   }
// });

// fetchISSFlyOverTimes({latitude: 49.2827291, longitude: -300.1207375}, (error, data) => {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log(data);
//   }
// });

const finalResult = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((err, data) => {
  if (err) {
    console.log(err);
  }  else {
    finalResult(data);
  }
});