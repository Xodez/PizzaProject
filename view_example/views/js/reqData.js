const {parse} = require('querystring');

exports.collectRequestData = function(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    if (request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        let parsedBody = [];
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            parsedBody = parse(body);
            callback(parsedBody);
        });
    } else {
        callback(null);
    }
};
