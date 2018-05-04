var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var routes = require('./routes');
var app = express();
var port = process.env.PORT || 3000;

app.server = http.createServer(app);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes());

app.listen(port, function () {
    console.log('media server running : http://localhost:3000');
});