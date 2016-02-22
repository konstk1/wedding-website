var express = require('express');
var monk = require('monk');

var router = express.Router();
var db = monk('localhost/rsvp');

router.get('/', function(req, res, next) {
    console.log('Admin here');

    var rsvps = db.get('rsvp');
    rsvps.insert({'name': 'kon', 'coming': 'yes'}, function(err, doc) {
        if (err) {
            console.log('Error: ' + err);
        } else {
            console.log('Success: ' + JSON.stringify(doc));
        }
    });

    var ans = rsvps.find();

    res.render('admin', {title: 'Admin', answers: ans});
});

module.exports = router;