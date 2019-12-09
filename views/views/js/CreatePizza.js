const http = require('http');
const url = require('url');
const ejs = require('ejs');
const fs = require('fs');
const reqData = require("./reqData");
const Home = require("./Home");
const {parse} = require('querystring');
const sqlite3 = require('sqlite3').verbose();
let string = '../pages/CreatePizza.ejs';

exports.CreatePizza = function (req, res) {
    let ingredients = [];
    let db = new sqlite3.Database('../../../sqlite/Pizza database.db');
    let sql = `SELECT "Ingredient name" i, "Price" p, "Ingredient ID" ind FROM "Ingredients"`;
    db.all(sql, (err, row) => {
        if (err) {
            throw err;
        } else {
            row.forEach(row => {
                let ingredient = {
                    name: row.i,
                    price: row.p,
                    ind: row.ind,
                };
                ingredients.push(ingredient);
            });
            ejs.renderFile(string, {ingredients: ingredients}, (err, data) => {
                if (err) throw err;
                res.end(data);
                db.close();
            })
        }
    });
};

exports.UploadPizza = function (req, res) {
    let db = new sqlite3.Database('../../../sqlite/Pizza database.db');
    reqData.collectRequestData(req, result => {
        let sql = `SELECT "Price" p, "Ingredient ID" ind FROM "Ingredients" WHERE "Ingredient ID" = ?`;
        let ingredientPrice = [];
        let callback = 0;
        for (let i = 0; i < result.Ingredients.length + 1; i++) {
            db.all(sql, [parseInt(result.Ingredients[i])], (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                if (callback === result.Ingredients.length) {
                    db.close();
                    insertPizza(req, res, ingredientPrice, result);
                } else
                    row.forEach(row => {
                        let Ingredient = {
                            ingredientID: row.ind,
                            price: row.p,
                        };
                        ingredientPrice.push(Ingredient);
                        callback++;
                    });
            });
        }
    });
};

function insertPizza(req, res, data, result) {
    let db = new sqlite3.Database('../../../sqlite/Pizza database.db');
    let sql = `INSERT into "Pizzas" values (null, ?, ?, "../images/pepperoni-pizza.png")`;
    let totalPrice = 15.0;
    for (let i = 0; i < data.length; i++) {
        totalPrice += data[i].price;
    }
    db.run(sql, [result.pizzaName, totalPrice], function (err) {
        if (err) {
            console.error(err.message);
        } else {
            db.close();
            Home.getPizzas(req, res);
        }
    });
}