const http = require('http');
const url = require('url');
const fs = require('fs');

module.exports = http.createServer((req, res) => {

    var service = require('./service.js');
    const reqUrl = url.parse(req.url, true);

    // GET Endpoint
    if (reqUrl.pathname == '/' && req.method === 'GET') {
        console.log('Request Type:' +
            req.method + ' Endpoint: ' +
            reqUrl.pathname);

        service.sampleRequest(req, res);

    } else if (reqUrl.pathname == '/css/LogIn.css') {
        res.writeHead(200, {'Content-type': 'text/css'});
        var fileContents = fs.readFileSync('../css/LogIn.css', 'utf8');
        res.write(fileContents);
        res.end();

    }
    else if (reqUrl.pathname == '/js/LogIn.js'){
        res.writeHead(200, {'Content-type': 'text/css'});
        var fileContents = fs.readFileSync('../js/LogIn.js', 'utf8');
        res.write(fileContents);
        res.end();
    }

    else {
        console.log('Request Type:' +
            req.method + ' Invalid Endpoint: ' +
            reqUrl.pathname);

        service.invalidRequest(req, res);

    }
});