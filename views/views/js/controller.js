const http = require('http');
const url = require('url');
const fs = require('fs');
const {parse} = require('querystring');
const sqlite3 = require('sqlite3').verbose()
const LogIn = require('./LogIn.js');
const Home = require('./Home.js');
const Register = require('./Register');

module.exports = http.createServer((req, res) => {


        const reqUrl = url.parse(req.url, true);

        // GET Endpoint
        if (reqUrl.pathname === '/' && req.method === 'GET') {
            LogIn.LogIn(req, res);
        } else if (reqUrl.pathname === '/' && req.method === 'POST') {
            Register.Register(req, res);
        } else if (reqUrl.pathname === '/css/LogIn.css') {
            LogIn.LogInCSS(req, res);
        } else if (reqUrl.pathname === '/css/Register.css') {
            Register.RegCSS(req, res);
        } else if (reqUrl.pathname === '/images/tasty-pepperoni-pizza-black-concrete-background_79782-103.jpg') {
            LogIn.BackgroundImage(req, res);
        } else if (reqUrl.pathname === '/images/pepperoni-pizza.png') {
            Home.Image(req, res);
        }
        else if (reqUrl.pathname === '/auth' && req.method === 'POST') {
            LogIn.Authentication(req, res);
        } else if (reqUrl.pathname === '/css/Home.css' && req.method === 'GET') {
            Home.HomeCSS(req, res);
        } else if (reqUrl.pathname === '/reg' && req.method === 'GET') {
            Register.Reg(req, res);
        } else {
            console.log('Request Type:' +
                req.method + ' Invalid Endpoint: ' +
                reqUrl.pathname);
            LogIn.invalidRequest(req, res);

        }
    }
);

