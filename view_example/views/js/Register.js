const url = require('url');
const fs = require('fs');
const ejs = require('ejs');
const connect = require('connect');
const sqlite3 = require("sqlite3").verbose();
const {parse} = require('querystring');
const reqData = require('./reqData');
let string = fs.readFileSync('../pages/Register.ejs', 'utf-8');
let fileContents;

exports.Reg = function(req, res){
    const reqUrl = url.parse(req.url, true);
    res.statusCode = 200;
    res.end(ejs.render(string));
};

exports.RegCSS = function (req, res) {
    res.writeHead(200, {'Content-type': 'text/css'});
    fileContents = fs.readFileSync('../css/Register.css', 'utf8');
    res.write(fileContents);
    res.end();
};