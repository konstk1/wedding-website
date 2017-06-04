var express = require('express');
var monk = require('monk');
var db = monk(process.env.MONGODB_URI);
var rsvps = db.get('rsvp');
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

var weddingDate = Date.parse("22-Sept-2017 17:00:00") / 1000;
var acadiaLatLon = [44.386432, -68.212873];

/* GET home page. */
router.get('/', function(req, res, next) {
  forecast.get(acadiaLatLon, function(err, weather) {
    if (err) return console.dir(err);
    currentTemp = Math.round(weather.currently.temperature);
    forecast.get(acadiaLatLon.concat(weddingDate), function(err, weather) {
      if (err) return console.dir(err);
      futureTemp = Math.round(weather.currently.temperature);
      var hourlyWeather = [];
      weather.hourly.data.forEach(function(d) {
        if (d.time >= 1506106800) {
          var time = new Date(d.time * 1000);
          if (time.getHours() % 2 != 0) {
            var c = {
              hour: time.getHours() - 12,
              temp: Math.round(d.temperature),
              cond: d.icon,
              precip: Math.round(d.precipProbability * 100),
              wind: Math.round(d.windSpeed)
            };
            hourlyWeather.push(c);
          }
        }
      });

      res.render('index', { title: 'Amanda + Eugene', temps: {current: currentTemp, future: futureTemp}, hourly_weather: hourlyWeather });
    });
  });
});

router.get('/rsvp', function(req, res, next) {
  res.render('rsvp_mobile', {title: 'RSVP', env: "test"});
});

router.post('/rsvp', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');

  rsvps.insert(req.body, function(err, doc) {
    if (err) {
      console.log('Error: ' + err);
      res.send('{"status": "insert failed"}');
    } else {
      res.send('{"status": "success"}');
      console.log('Success: ' + JSON.stringify(doc));
    }
  });

});

module.exports = router;
