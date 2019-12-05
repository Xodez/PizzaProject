const url = require('url');
const fs = require('fs');
const ejs = require('ejs');
const connect = require('connect');
const sqlite3 = require("sqlite3").verbose();
const {parse} = require('querystring');
const reqData = require('./reqData');
let fileContents;
let img;

exports.HomeCSS = function (req, res) {
    res.writeHead(200, {'Content-type': 'text/css'});
    fileContents = fs.readFileSync('../css/Home.css', 'utf8');
    res.write(fileContents);
    res.end();
};
