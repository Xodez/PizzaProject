const url = require('url');
const fs = require('fs');
const ejs = require('ejs');
const connect = require('connect');
var string = fs.readFileSync('../pages/LogIn.ejs', 'utf-8');

exports.sampleRequest = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    res.statusCode = 200;
    res.end(ejs.render(string));
};

exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};