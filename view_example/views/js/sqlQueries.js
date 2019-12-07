const url = require('url');
const fs = require('fs');
const ejs = require('ejs');
const connect = require('connect');
const sqlite3 = require("sqlite3").verbose();
const {parse} = require('querystring');
const reqData = require('./reqData');
const sqlQueries = require('./sqlQueries');
let string2 = '../pages/Home.ejs';
let pizzas = [];
let ingredients = [];

exports.getPizzas = function (req, res) {
    let db = new sqlite3.Database('../../../sqlite/Pizza database.db');
    let sql = `SELECT "Popular Pizza" p, "Pizza ID" pid FROM Pizzas`;
    db.all(sql, (err, row) =>{
        if (err) {
            throw err;
        }
        else{
            row.forEach(row =>{
                let pizza = {
                    pizza: row.p,
                    pid: row.pid
                };
                pizzas.push(pizza);
            });
        }
    });
    sql = `SELECT "Ingredient name" i, i."Ingredient ID" iid FROM Ingredients i, "Pizza Ingredients" pi, Pizzas p 
            WHERE pi."Pizza ID" = p."Pizza ID" AND pi."Ingredient ID" = i."Ingredient ID"`;
    db.all(sql, (err, row) =>{
       if (err) {
           throw err;
       }
       else{
           row.forEach(row =>{
               let ingredient = {
                   ingredient: row.i,
                   iid: row.iid
               };
               ingredients.push(ingredient);
           });
           ejs.renderFile(string2, {pizzas: pizzas}, (err, data) => {
               if (err) throw err;
               res.end(data);
           });
       }
    });
};
