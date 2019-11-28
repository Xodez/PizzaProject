const url = require('url');

ejs.renderFile(index_path, {drinks: drinks, tagline: tagline}, (err, data) => {
    console.log(err || data);
    res.end(data);
})

else
if (req.url === '/about')
    ejs.renderFile(about_path, (err, data) => {
        console.log(err || data);
        res.end(data);
    });
else {
    res.statusCode = 404;
    res.end('Not Found');
}
