const url = require('url');
const fs = require('fs');
const ejs = require('ejs');
const connect = require('connect');
const sqlite3 = require("sqlite3").verbose();
const {parse} = require('querystring');
const reqData = require('./reqData');
const Home = require("./Home");

exports.cartAdded = function (req, res) {
    let db = new sqlite3.Database('../../../sqlite/Pizza database.db');
    reqData.collectRequestData(req, result => {
        let sql = `SELECT "Popular Pizza" p, price pr FROM Pizzas WHERE "Popular Pizza" = ? ORDER BY "Pizza ID"`;
        db.get(sql, [result.name], (err, row) => {
            if (err) {
                console.log(err.message);
            } else {
                db.run(`insert into "Order" values (null, ?, ?)`, [row.p, row.pr], function (err) {
                    if (err) {
                        console.log(err.message);
                    }
                    Home.getPizzas(req, res);
                });
            }
        });
    });
};