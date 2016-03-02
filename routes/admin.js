var express = require('express');
var monk = require('monk');

var router = express.Router();
var db = monk(process.env.MONGOLAB_URI);
var collection = db.get('rsvp');

router.get('/', function(req, res, next) {
    console.log('Admin here');

    var rsvps = collection.find({},{}, function(e, docs) {
       res.render('admin', {title: 'Admin', rsvps: docs});
    });
});

module.exports = router;