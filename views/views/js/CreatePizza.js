const http = require('http');
const url = require('url');
const ejs = require('ejs');
const fs = require('fs');
const {parse} = require('querystring');
const sqlite3 = require('sqlite3').verbose();
let string = '../pages/CreatePizza.ejs';

exports.CreatePizza = function (req, res) {

    ejs.renderFile(string, (err, data) => {
        if (err) throw err;
        res.end(data);
    })
};