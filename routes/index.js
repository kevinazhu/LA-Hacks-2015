var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Landing Page' });
});

router.get('/login', function(req, res) {
  res.render('login', { title: 'Respoke Login' });
});

router.get('/grouppage', function(req, res) {
    res.render('grouppage', { title: 'Groups Page' });
});

module.exports = router;
