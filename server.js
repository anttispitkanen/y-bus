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


// UTA coords (Keskusta)
// "3328662.500000,6825009.000000"
const UTAcoords = '3328662.500000,6825009.000000';

// TUT coords (Hervanta)
// "3332742.500000,6819846.000000"
const TUTcoords = '3332742.500000,6819846.000000';

// TAMK coords (Kauppi)
// "3330355.500000,6826018.000000"
const TAMKcoords = '3330355.500000,6826018.000000';


const routeCoords = [
    {
        name: 'KeskustaHervanta',
        query: `from=${UTAcoords}&to=${TUTcoords}`
    }, {
        name: 'KeskustaKauppi',
        query:`from=${UTAcoords}&to=${TAMKcoords}`
    }, {
        name: 'HervantaKeskusta',
        query: `from=${TUTcoords}&to=${UTAcoords}`
    }, {
        name: 'HervantaKauppi',
        query: `from=${TUTcoords}&to=${TAMKcoords}`
    }, {
        name: 'KauppiKeskusta',
        query: `from=${TAMKcoords}&to=${UTAcoords}`
    }, {
        name: 'KauppiHervanta',
        query: `from=${TAMKcoords}&to=${TUTcoords}`
    }
]

// the latest routes stored here as JSON objects
let latestRoutes = {
    KeskustaHervanta: null,
    KeskustaKauppi: null,
    HervantaKeskusta: null,
    HervantaKauppi: null,
    KauppiKeskusta: null,
    KauppiHervanta: null
};

// fetch updated routes every 60 seconds
// setInterval(() => {
//     console.log('ny! :D');
// }, 60000);



function updateRoutes() {
    routeCoords.forEach(route => {

        const URL = `http://api.publictransport.tampere.fi/prod/?${process.env.API_KEY}&${process.env.API_PASS}&request=route&${route.query}&Detail=limited`; //&show=1

        request(URL, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                latestRoutes[route.name] = body;
            }
        })
    })
}

// update routes on server startup and then every 60 seconds
updateRoutes();
setInterval(() => {
    updateRoutes();
    console.log('routes updated at ' + new Date().toLocaleTimeString());
}, 60000);

// answer client request with stored route data
app.post('/route', (req, res) => {
    res.send(latestRoutes[req.body.name]);
})
