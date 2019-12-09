const http = require('http');
const url = require('url');
const fs = require('fs');
const {parse} = require('querystring');
const sqlite3 = require('sqlite3').verbose();
let img;
let fileContents;
let reqUrl;

exports.Image = function (req, res) {
    reqUrl = url.parse(req.url, true);
    img = fs.readFileSync('../' + reqUrl.pathname);
    res.writeHead(200, {'Content-Type': 'image/gif'});
    res.end(img, 'binary');
};

exports.CSS = function (req, res) {
    reqUrl = url.parse(req.url, true);
    res.writeHead(200, {'Content-type': 'text/css'});
    fileContents = fs.readFileSync('../' + reqUrl.pathname, 'utf8');
    res.write(fileContents);
    res.end();
};

exports.JS = function (req, res) {
    reqUrl = url.parse(req.url, true);
    res.writeHead(200, {'Content-type': 'text/javascript'});
    fileContents = fs.readFileSync('../' + reqUrl.pathname, 'utf8');
    res.write(fileContents);
    res.end();
};