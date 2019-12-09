const url = require('url');
const fs = require('fs');
const ejs = require('ejs');
const connect = require('connect');
const sqlite3 = require("sqlite3").verbose();
const {parse} = require('querystring');
const reqData = require('./reqData');
const home = require('./Home');
let string = fs.readFileSync('../pages/LogIn.ejs', 'utf-8');
let string2 = fs.readFileSync('../pages/Home.ejs', 'utf-8');
let fileContents;
let img;
let user = "";
let pass = "";

exports.LogIn = function (req, res) {
    res.statusCode = 200;
    res.end(ejs.render(string));
};

exports.invalidRequest = function (req, res) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Invalid Request');
};

exports.Authentication = function (req, res) {
    let db = new sqlite3.Database('../../../sqlite/Pizza database.db');
    db.run(`delete from "Pizza Ingredients" where "Pizza ID" > 4`, function (err) {
        if (err) {
            console.error(err.message);
        }
    });
    db.run(`delete from pizzas where "Pizza ID" > 4`, function (err) {
        if (err) {
            console.error(err.message);
        }
    });
    reqData.collectRequestData(req, result => {
        let sql = `SELECT Username u, Password p FROM Costumer 
                WHERE Username = ? AND Password = ?`;
        db.get(sql, [result.username, result.password], (err, row) => {
            if (err) {
                console.error(err.message);
            }
            if (row == undefined) {
                res.end(ejs.render(string));
                db.close();
            } else {
                user = result.username;
                pass = result.password;
                home.getPizzas(req, res);
                db.close();
            }
        });
    });
};