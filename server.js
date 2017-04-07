'use strict';

const express = require('express');
const request = require('request');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

const app = express();



app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
}

app.use(bodyParser.urlencoded( { extended: true } ));
app.use(bodyParser.json());

app.listen(app.get('port'), () => {
    console.log('listening on port ' + app.get('port'));
})

app.get('/', (req, res) => {
    res.send({ "message": "hit the root"})
})

app.post('/route', (req, res) => {

    const startCoords = req.body.startCoords;
    const destCoords = req.body.destCoords;

    console.log('start ' + startCoords);
    console.log('dest  ' + destCoords);

    // res.send({"body": "jeejee"});


    let queryURL = `http://api.publictransport.tampere.fi/prod/?${process.env.API_KEY}&${process.env.API_PASS}&request=route&from=${startCoords}&to=${destCoords}&Detail=limited`; //&show=1

    request(queryURL, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            res.send(body);
        }
    })

})
