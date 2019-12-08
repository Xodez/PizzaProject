const url = require('url');
const fs = require('fs');
const ejs = require('ejs');
const connect = require('connect');
const sqlite3 = require("sqlite3").verbose();
const {parse} = require('querystring');
const reqData = require('./reqData');
let fileContents;
let img;
let string2 = '../pages/Home.ejs';
let pizzas = [];
let ingredients = [];
let misc = [];


exports.getPizzas = function (req, res) {
    let db = new sqlite3.Database('../../../sqlite/Pizza database.db');
    let sql = `SELECT "Popular Pizza" p, "Pizza ID" pid, price pr, "Image ID" imid FROM Pizzas ORDER BY "Pizza ID"`;
    db.all(sql, (err, row) => {
        if (err) {
            throw err;
        } else {
            row.forEach(row => {
                let pizza = {
                    pizza: row.p,
                    pid: row.pid,
                    price: row.pr,
                    imid: row.imid
                };
                pizzas.push(pizza);
            });
        }
    });
    sql = `SELECT "Item name" i, "Price" p FROM "Non pizza items" ORDER BY "Price"`;
    db.all(sql, (err, row) => {
        if (err) {
            throw err;
        } else {
            row.forEach(row => {
                let miscs = {
                    misc: row.i,
                    price: row.p,
                };
                misc.push(miscs);
            });
        }
    });
    sql = `SELECT "Ingredient name" i, p."Pizza ID" pid FROM Ingredients i, "Pizza Ingredients" pi, Pizzas p 
            WHERE pi."Pizza ID" = p."Pizza ID" AND pi."Ingredient ID" = i."Ingredient ID" ORDER BY p."Pizza ID"`;
    db.all(sql, (err, row) => {
        if (err) {
            throw err;
        } else {
            row.forEach(row => {
                let ingredient = {
                    ingredient: row.i,
                    pid: row.pid,
                };
                ingredients.push(ingredient);
            });
            ejs.renderFile(string2, {pizzas: pizzas, ingredients: ingredients, misc: misc}, (err, data) => {
                if (err) throw err;
                res.end(data);
            });
        }
    });
};