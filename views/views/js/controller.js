const http = require('http');
const url = require('url');
const fs = require('fs');
const {parse} = require('querystring');
const sqlite3 = require('sqlite3').verbose();
const LogIn = require('./LogIn.js');
const Home = require('./Home.js');
const Register = require('./Register');
const HTMLrequests = require('./HTMLrequests');
const CreatePizza = require("./CreatePizza");

module.exports = http.createServer((req, res) => {


        const reqUrl = url.parse(req.url, true);

        // GET Endpoint
        if (reqUrl.pathname === '/' && req.method === 'GET') {
            LogIn.LogIn(req, res);
        } else if (reqUrl.pathname === '/' && req.method === 'POST') {
            Register.Register(req, res);
        } else if (reqUrl.pathname.includes('.css')) {
            HTMLrequests.CSS(req, res);
        } else if (reqUrl.pathname === '/create' && req.method === 'GET') {
            CreatePizza.CreatePizza(req, res);
        } else if (reqUrl.pathname === '/create' && req.method === 'POST') {
            CreatePizza.UploadPizza(req, res);
        } else if (reqUrl.pathname.includes('.jpg') || reqUrl.pathname.includes('.png')) {
            HTMLrequests.Image(req, res);
        } else if (reqUrl.pathname.includes('.js')) {
            HTMLrequests.CSS(req, res);
        } else if (reqUrl.pathname === '/auth' && req.method === 'POST') {
            LogIn.Authentication(req, res);
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

