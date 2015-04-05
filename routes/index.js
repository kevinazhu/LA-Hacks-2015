var express = require('express');
var router = express.Router();
var Respoke = require('respoke-admin');

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

router.get('/token', function(req, res) {
    var userRoleId = "92AC5BDB-E38E-436D-A4A8-7F1D4F9C9240";
    req.respoke.auth.endpoint({
        endpointId: req.session.user,
        roleId: userRoleId
    }, function (err, authData) {
        if (err) { console.error(err); return; }

        // Now we have a token for an end user to authenticate as an endpoint.
        console.log(authData.tokenId); // "XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"
        var user = new Respoke({ appId: req.appId });

        user.auth.sessionToken({ tokenId: authData.tokenId }, function (err, sessionData) {
            if (err) { console.error(err); return; }

            // Now we have a session token from `sessionData.token`.
            // However, for our purposes, there is no need to do anything with it because
            // the library caches it automatically at `billy.tokens['App-Token']`, and
            // uses it when it needs it.
            user.auth.connect();

            // Respoke is an EventEmitter
            user.on('connect', function () {
                console.log('user is connected to respoke!');
            });
        });

        res.send({
            token: authData.tokenId,
        });
    });
});

router.get('/grouppage', function(req, res) {
    res.render('grouppage', { title: 'Groups Page' });
});

module.exports = router;
