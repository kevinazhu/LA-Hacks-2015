var express = require('express');
var router = express.Router();
var mysql = require('mysql');

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
        res.render('chatTemp', { title: 'Chat Page', user: req.session.user });
    else
        res.redirect('/login');
});

router.get('/grouppage', function(req, res) {
    res.render('grouppage', { title: 'Groups Page' });
});

module.exports = router;

