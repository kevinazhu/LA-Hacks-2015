var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Landing Page' });
});

router.get('/login', function(req, res) {
    if(req.session.user)
        res.redirect('/chat');
    else
        res.render('login', { title: 'Respoke Login' });
});

router.post('/trytologin', function(req, res) {
    req.session.user = req.body.username;
    res.status(200).end();
});

router.get('/chat', function(req, res) {
    if(req.session.user)
        res.render('chatTemp', { title: 'Chat Page', user: req.session.user });
    else
        res.redirect('/login');
});

router.get('/grouppage', function(req, res) {
    res.render('grouppage', { title: 'Groups Page' });
});

module.exports = router;
