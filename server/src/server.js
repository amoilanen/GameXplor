var connect = require('connect');

//Serving static content
connect.createServer(
    connect.static('../..')
).listen(8000);

//TODO: Proxifying calls to external services can be done here