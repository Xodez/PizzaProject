const http = require('http');
const url = require('url');
const ejs = require('ejs');
const fs = require('fs');
const reqData = require("./reqData");
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
                    id: row.ind,
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
    // let db = new sqlite3.Database('../../../sqlite/Pizza database.db');
    // reqData.collectRequestData(req, result => {
    //     let sql = ``;
    // });
    reqData.collectRequestData(req, result => {
        console.log(result);
    });
};