
const Promise = require('bluebird');
const envMortData = require('./environmentalMortality')
const db = require('../server/db')
const EnvMort = db.models.envMort


db.sync({force: true})
.then(function () {
  console.log("Dropped old data, now inserting data");
  const creatingEnvDatabase = Promise.map(envMortData.fact, function(datapoint) {
    const val = +datapoint.Value
    return EnvMort.create({
      country: datapoint.dims.COUNTRY,
      gho: datapoint.dims.GHO,
      year: datapoint.dims.YEAR,
      value: val
    });
  });
  return Promise.all(creatingEnvDatabase); // if more tables needed
})
.then(function () {
  console.log('Finished inserting data');
})
.catch(function (err) {
  console.error('There was totally a problem', err, err.stack);
})
.finally(function () {
  db.close(); // creates but does not return a promise
  return null; // stops bluebird from complaining about un-returned promise
});