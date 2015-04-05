var express = require('express');
var router = express.Router();
var Respoke = require('respoke-admin');
var mysql = require('mysql');

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Landing Page' });
});

router.post('/trytologin', function(req, res) {
    req.session.user = req.body.username;
    res.status(200).end();
});

router.post('/querySQL', function(req, res) {
    //req.body.name == data
    //req.body.name2 == data2
    var connection = mysql.createConnection({
        host : '104.236.199.139',
        user : 'root',
        password : 'k3AHc3DruW',
        database : 'la',
        port : 3306,
        socket : '/var/run/mysqld/mysqld.sock'
    });


    connection.connect(function(err) {
        if(err)
            console.log(err);
    });
    var post = req.body.queryName;
    connection.query(post, function(err, rows, fields) {
        if (!err) {
            res.send({queryResults: rows});
        }
        else
            console.log('Error while performing query: ' + err);
    });

    connection.end();

});

router.post('/insertSQL', function(req, res) {
    //req.body.name == data
    //req.body.name2 == data2
    var connection = mysql.createConnection({
        host : '104.236.199.139',
        user : 'root',
        password : 'k3AHc3DruW',
        database : 'la',
        port : 3306,
        socket : '/var/run/mysqld/mysqld.sock'
    });


    connection.connect(function(err) {
        if(err)
            console.log(err);
    });

    var post = {groupID: req.body.name, Description: req.body.description, LBound: req.body.LBound, RBound: req.body.RBound, UBound: req.body.UBound, DBound: req.body.DBound};
    connection.query('INSERT INTO GROUPS SET ?;', post, function(err, rows, fields) {
        if (!err)
            console.log('The solution is: ', rows);
        else
            console.log('Error while performing query: ' + err);
    });

    connection.end();

});

router.get('/chat', function(req, res) {
    if(req.session.user)
        res.render('chat', { title: 'Chat Page', user: req.session.user });
    else
        res.redirect('/groups');
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

router.get('/groups', function(req, res) {
    res.render('groups', { title: 'Groups Page' });
});

module.exports = router;
