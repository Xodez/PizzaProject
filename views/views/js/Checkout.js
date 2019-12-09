const url = require('url');
const fs = require('fs');
const ejs = require('ejs');
const connect = require('connect');
const sqlite3 = require("sqlite3").verbose();
const {parse} = require('querystring');
const reqData = require('./reqData');
const Home = require("./Home");
let string = '../pages/Checkout.ejs';

exports.Checkout = function (req, res) {
    let items = [];
    let totalPrice = 0.0;
    let db = new sqlite3.Database('../../../sqlite/Pizza database.db');
    let sql = `SELECT "Item" i, "Price" pr FROM "Order"`;
    db.all(sql, (err, row) => {
        if (err) {
            console.log(err.message);
        } else {
            row.forEach(row => {
                let item = {
                    item: row.i,
                    price: row.pr,
                };
                totalPrice += row.pr;
                items.push(item);
            });
            ejs.renderFile(string, {items: items, totalPrice: totalPrice}, (err, data) => {
                if (err) throw err;
                res.end(data);
                db.close();
            });
        }
    });
};

exports.ConfirmOrder = function (req, res) {
    res.end(ejs.render(fs.readFileSync('../pages/ConfirmOrder.ejs', 'utf-8')));
};