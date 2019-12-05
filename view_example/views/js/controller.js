const http = require('http');
const url = require('url');
const fs = require('fs');
const {parse} = require('querystring');
const sqlite3 = require('sqlite3').verbose();

module.exports = http.createServer((req, res) => {

    var LogIn = require('./LogIn.js');

    const reqUrl = url.parse(req.url, true);

    // GET Endpoint
    if (reqUrl.pathname === '/' && req.method === 'GET') {
        LogIn.LogIn(req, res);
    } else if (reqUrl.pathname === '/css/LogIn.css') {
        LogIn.LogInCSS(req, res);
    } else if (reqUrl.pathname === '/images/tasty-pepperoni-pizza-black-concrete-background_79782-103.jpg') {
        LogIn.BackgroundImage(req, res);
    } else if (reqUrl.pathname === '/auth' && req.method === 'POST') {
        LogIn.Authentication(req, res);
    } else if (reqUrl.pathname === '/authenticated' && req.method === 'GET') {
        LogIn.Authenticated(req, res);
    } else {
        console.log('Request Type:' +
            req.method + ' Invalid Endpoint: ' +
            reqUrl.pathname);
        LogIn.invalidRequest(req, res);

    }
});

