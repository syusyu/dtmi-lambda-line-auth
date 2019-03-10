const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');


const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));

const cors = require('cors');
app.use(cors());
// app.use(express.static('public'));


app.post("/line-notify-token", function(req, res){

    console.log('### parameters=' + JSON.stringify(req.body))

    const options = {
        url: 'https://notify-bot.line.me/oauth/token',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        json: true,
        form: req.body
    };

    request(options, function (error, response, body) {
        res.writeHead(response.statusCode, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
        console.log('### response.body=' + JSON.stringify(body));
        res.end(JSON.stringify(body));
    });
});

var options = {
    key: fs.readFileSync('./cert/server.key'),
    cert: fs.readFileSync('./cert/server.crt')
};
var server = https.createServer(options, app);
server.listen(3002, function () {
    console.log('HTTPS Server(3002) is running.');
})
