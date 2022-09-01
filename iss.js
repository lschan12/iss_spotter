const request = require("request");

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    let ip = JSON.parse(body).ip;
    callback(null, ip);
  });
};

const fetchCoordsByIP = function(ip, callback) {
  request(`http://ipwho.is/${ip}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    let data = JSON.parse(body);
    let success = data.success;
    if (!success) {
      const msg = data.message;
      callback(Error(msg), null);
      return;
    }
    let coordinates = {
      latitude: data.latitude,
      longitude: data.longitude,
    };
    callback(null, coordinates);
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const data = JSON.parse(body);
    callback(null, data.response);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((err, ip) => {
    if (err) {
      return callback(err, null);
    }
    fetchCoordsByIP(ip, (err, coords) => {
      if (err) {
        return callback(err, null);
      }
      fetchISSFlyOverTimes(coords, (err, data) => {
        if (err) {
          return callback(err, null);
        }
        callback(null, data);
      });
    });
  });
};

module.exports = {nextISSTimesForMyLocation};