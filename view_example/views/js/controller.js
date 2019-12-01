const http = require('http');
const url = require('url');
const fs = require('fs');

module.exports = http.createServer((req, res) => {

    var service = require('./service.js');
    var fileContents;
    var img;
    const reqUrl = url.parse(req.url, true);

    // GET Endpoint
    if (reqUrl.pathname == '/' && req.method === 'GET') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        service.sampleRequest(req, res);

    } else if (reqUrl.pathname == '/css/LogIn.css') {
        res.writeHead(200, {'Content-type': 'text/css'});
        fileContents = fs.readFileSync('../css/LogIn.css', 'utf8');
        res.write(fileContents);
        res.end();

    }
    else if (reqUrl.pathname == '/js/LogIn.js'){
        res.writeHead(200, {'Content-type': 'text/css'});
        fileContents = fs.readFileSync('../js/LogIn.js', 'utf8');
        res.write(fileContents);
        res.end();
    }

    else if (reqUrl.pathname == '/images/tasty-pepperoni-pizza-black-concrete-background_79782-103.jpg'){
        img = fs.readFileSync('../images/tasty-pepperoni-pizza-black-concrete-background_79782-103.jpg');
        res.writeHead(200, {'Content-Type': 'image/gif' });
        res.end(img, 'binary');
    }

    else if (reqUrl.pathname == '/images/tasty-pepperoni-.jpg'){
        img = fs.readFileSync('../images/tasty-pepperoni-.jpg');
        res.writeHead(200, {'Content-Type': 'image/gif' });
        res.end(img, 'binary');
    }

    else {
        console.log('Request Type:' +
            req.method + ' Invalid Endpoint: ' +
            reqUrl.pathname);

        service.invalidRequest(req, res);

    }
});