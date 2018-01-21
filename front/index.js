var http = require('http');
var app = require('express')();
var express = require('express');
httpserver = http.createServer(app);
var request = require('request');


app.get('/', function (req, res) {
    res.sendfile(__dirname + '/src/templates/login.html');
});

app.use('/css', express.static('src/css'));
app.use('/js', express.static('src/js'));
app.use('/tpt', express.static('src/templates'));


app.post('/autentificate', function (req, res) {
     request.post({
         url: 'http://localhost:8081/autentificate',
         form: {
             login: req.body.login,
             password: req.body.password
         }
     }, function (error, response, body) {
         if(!error && response.statusCode){
             res.json({
                 'id': response._id,
                 'path': '/tpt/listeProduit.html'
             });
         }else {
             res.json({'path':'/src/templates/login.html'});
         }
     });
});



httpserver.listen(8082);


console.log('Server running at http://127.0.0.1:8082/');