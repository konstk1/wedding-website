var express = require('express');
// var monk = require('monk');
// var db = monk(process.env.MONGOLAB_URI);
// var rsvps = db.get('rsvp');
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
  // forecast.get(newportLatLon, function(err, weather) {
  //   if (err) return console.dir(err);
  //   currentTemp = Math.round(weather.currently.temperature);
  //   forecast.get(newportLatLon.concat(weddingDate), function(err, weather) {
  //     if (err) return console.dir(err);
  //     futureTemp = Math.round(weather.currently.temperature);
  //     var hourlyWeather = [];
  //     weather.hourly.data.forEach(function(d) {
  //       if (d.time >= 1463943600) {
  //         var time = new Date(d.time * 1000);
  //         if (time.getHours() % 2 != 0) {
  //           var c = {
  //             hour: time.getHours() - 12,
  //             temp: Math.round(d.temperature),
  //             cond: d.icon,
  //             precip: Math.round(d.precipProbability * 100),
  //             wind: Math.round(d.windSpeed)
  //           };
  //           hourlyWeather.push(c);
  //         }
  //       }
  //     });

  //   });
  // });
  res.render('index', { title: 'Steph + Kon', temps: {current: 70, future: 70}, hourly_weather: [] });
});

// router.get('/rsvp', function(req, res, next) {
//   res.render('rsvp_mobile', {title: 'RSVP', env: "test"});
// });

// router.post('/rsvp', function(req, res, next) {
//   res.setHeader('Content-Type', 'application/json');

//   rsvps.insert(req.body, function(err, doc) {
//     if (err) {
//       console.log('Error: ' + err);
//       res.send('{"status": "insert failed"}');
//     } else {
//       res.send('{"status": "success"}');
//       console.log('Success: ' + JSON.stringify(doc));
//     }
//   });

// });

module.exports = router;
