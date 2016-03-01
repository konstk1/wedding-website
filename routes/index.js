var express = require('express');
var router = express.Router();
var Forecast = require('forecast');

var forecast = new Forecast({
  service: 'forecast.io',
  key: 'b2f3210058fc18d72d41d32d9c06d6f8',
  units: 'fahrenheit',
  cache: true,
  ttl: {
    minutes: 60
  }
});

var weddingDate = Date.parse("22-May-2016 17:00:00") / 1000;
var newportLatLon = [41.529462, -71.272534];

/* GET home page. */
router.get('/', function(req, res, next) {
  forecast.get(newportLatLon, function(err, weather) {
    if (err) return console.dir(err);
    currentTemp = Math.round(weather.currently.temperature);
    forecast.get(newportLatLon.concat(weddingDate), function(err, weather) {
      if (err) return console.dir(err);
      futureTemp = Math.round(weather.currently.temperature);
      res.render('index', { title: 'Steph + Kon', temps: {current: currentTemp, future: futureTemp} });
    });
  });
});

router.get('/rsvp', function(req, res, next) {
  res.render('rsvp_mobile', {title: 'RSVP', env: "test"});
});

router.post('/rsvp', function(req, res, next) {
  res.send('Posted' + req);
});

module.exports = router;
