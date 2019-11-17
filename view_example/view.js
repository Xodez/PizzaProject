//import libraries
const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

//create a host and port
const HOST_NAME = '127.0.0.1';
const PORT_NUM = process.env.PORT || 3000;

//location of template files
const filePath = __dirname + '/views/pages/'; //__dirname is always the current directory, same as ./
const index_path = filePath + 'index.ejs';
const about_path = filePath + 'about.ejs';

//create a HTTP server
const server = http.createServer((req, res) =>
{
    if (req.url === '/') {
        let drinks = [
            {name: 'Bloody Mary', drunkness: 3},
            {name: 'Martini', drunkness: 5},
            {name: 'Scotch', drunkness: 10}
        ];
        let tagline = "Any code of your own that you haven't looked at for six or more months might as well have been written by someone else.";

        //use renderFile to render the ejs file in the path to html file
        //the rendered result is stored in the data object
        /*
           The main difference between render and renderFile methods:
           render() takes string as a template and is a synchronous method.
           renderFile() takes file path as input and is asynchronous and takes a function call back.
         */
        ejs.renderFile(index_path, {drinks:drinks, tagline: tagline}, (err, data) =>
        {   console.log(err || data);
            res.end(data);
        });
    }
    else if (req.url === '/about')
        ejs.renderFile(about_path, (err, data) =>
        {    console.log(err || data);
             res.end(data);
        });
    else {
        res.statusCode = 404;
        res.end('Not Found');
    }
});

//listen to the http server with the dedicated port number
server.listen(PORT_NUM, HOST_NAME, () =>
{
    console.log(`Server is running at ${HOST_NAME}:${PORT_NUM}`);
});