var express = require('express'),
    https = require('https');

var DEFAULT_PORT = 8000,
    DEFAULT_VIDEO_LIMIT = 5,
    EVERYPLAY_CLIENT_ID = "336d586b6e1b5e4a0f9eaa48e7e697d8cd51db40";

var app = express();

app.use(express.static(__dirname + '/../..'));

function proxyRequestTo(url, request, response) {
    var limit = request.query.limit || DEFAULT_VIDEO_LIMIT,
        data = "";

    https.get(url + "client_id=" + EVERYPLAY_CLIENT_ID + "&limit=" + limit, function(res) {
        res.on('data', function (chunk) {
            data += chunk.toString();
        }).on('end', function() {
            response.write(data);
            response.end();
        });
    }).on('error', function(e) {
        //TODO: Communicate this to the client
        console.error("Error while fetching videos" + e.message);
    });
}

app.get('/videos',function(request, response) {
    proxyRequestTo("https://everyplay.com/api/playlists/1/videos?", request, response);
});

app.get('/games',function(request, response) {
    proxyRequestTo("https://everyplay.com/api/games/featured?data=all&", request, response);
});

app.listen(DEFAULT_PORT);