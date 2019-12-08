const url = require('url');
const fs = require('fs');
const ejs = require('ejs');
const connect = require('connect');
const sqlite3 = require("sqlite3").verbose();
const {parse} = require('querystring');
const reqData = require('./reqData');
let string = fs.readFileSync('../pages/Register.ejs', 'utf-8');
let string2 = fs.readFileSync('../pages/LogIn.ejs', 'utf-8');
let fileContents;

exports.Reg = function (req, res) {
    const reqUrl = url.parse(req.url, true);
    res.statusCode = 200;
    res.end(ejs.render(string));
};

exports.Register = function (req, res) {
    let body = '';
    let db = new sqlite3.Database('../../../sqlite/Pizza database.db');
    let auth;
    reqData.collectRequestData(req, result => {
        let sql = `INSERT into Costumer values (null, ?, ?, null, null, null, ?)`;
        db.run(sql, [result.username, result.password, result.email], function (err) {
            if (err) {
                console.error(err.message);
            }
            db.close();
            res.end(ejs.render(string2));
        });
    });
};