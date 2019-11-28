const url = require('url');
const fs = require('fs');
const ejs = require('ejs');
var string = fs.readFileSync('../pages/LogIn.ejs', 'utf-8');

exports.sampleRequest = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    res.statusCode = 200;
    res.end(ejs.render(string));
};

exports.testRequest = function (req, res) {
    body = '';

    req.on('data', function (chunk) {
        body += chunk;
    });

    req.on('end', function () {

        postBody = JSON.parse(body);

        var response = {
            "text": "Post Request Value is  " + postBody.value
        };

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify(response));
    });
};

exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};