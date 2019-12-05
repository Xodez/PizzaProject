const url = require('url');
const fs = require('fs');
const ejs = require('ejs');
const connect = require('connect');
const sqlite3 = require("sqlite3").verbose();
const {parse} = require('querystring');
const reqData = require('./reqData');
var string = fs.readFileSync('../pages/LogIn.ejs', 'utf-8');
var fileContents;
var img;

exports.LogIn = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    res.statusCode = 200;
    res.end(ejs.render(string));
};

exports.LogInCSS = function (req, res) {
    res.writeHead(200, {'Content-type': 'text/css'});
    fileContents = fs.readFileSync('../css/LogIn.css', 'utf8');
    res.write(fileContents);
    res.end();
};

exports.BackgroundImage = function (req, res) {
    img = fs.readFileSync('../images/tasty-pepperoni-pizza-black-concrete-background_79782-103.jpg');
    res.writeHead(200, {'Content-Type': 'image/gif'});
    res.end(img, 'binary');
};

exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};

exports.Authentication = function (req, res) {
    let body = '';
    let auth = "test";
    let db = new sqlite3.Database('../../../sqlite/Pizza database.db');
    reqData.collectRequestData(req, result => {
        let sql = `SELECT Username u, Password p FROM Costumer 
                WHERE Username = ? AND Password = ?`;
        db.get(sql, [result.username, result.password], (err, row) => {
            if (err) {
                return console.error(err.message);
            }
            return row
                ? auth = fs.readFileSync('../pages/Home.ejs', 'utf-8')
                : auth = fs.readFileSync('../pages/LogIn.ejs', 'utf-8');

        });
        db.close();
        res.end(auth);
    });
};
