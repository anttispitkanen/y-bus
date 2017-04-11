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



function updateRoutes() {

    const d = new Date();

    routeCoords.forEach(route => {

        // if previous route info exists, check if it should be updated
        if (latestRoutes[route.name] !== null) {
            if (checkIfRouteShouldBeUpdated(latestRoutes[route.name], d)) {
                const URL = `http://api.publictransport.tampere.fi/prod/?${process.env.API_KEY}&${process.env.API_PASS}&request=route&${route.query}&Detail=limited`; //&show=1

                request(URL, (error, response, body) => {
                    if (!error && response.statusCode === 200) {
                        latestRoutes[route.name] = body;
                        console.log(route.name + ' updated at ' + d.toLocaleTimeString());
                    }
                })
            }

        } else {
            // initial routes fetch
            const URL = `http://api.publictransport.tampere.fi/prod/?${process.env.API_KEY}&${process.env.API_PASS}&request=route&${route.query}&Detail=limited`; //&show=1

            request(URL, (error, response, body) => {
                if (!error && response.statusCode === 200) {
                    latestRoutes[route.name] = body;
                }
            })
        }

    })
}

//returns true if route should be updated, false otherwise
function checkIfRouteShouldBeUpdated(previousRoute, d) {
    const route = JSON.parse(previousRoute)[0][0];
    const diff = (parseDepartureTime(route) - parseDateNow(d)) % 10000 % 40;
    return (diff <= 0) ? true : false;
}


// returns YYYYMMDDHHMM int for the bus departure
function parseDepartureTime(data) {
    const departure = data.legs[0].locs[0].depTime;
    return parseInt(departure);
}

// parse YYYYMMDDHHMM int out of current time
function parseDateNow(d) {
    let dateStringNow = '';
    const year = '' + d.getFullYear();
    const month = (d.getMonth() + 1 < 10) ? ('0' + (d.getMonth() + 1)) : ('' + (d.getMont() + 1));
    const day = (d.getDate() < 10) ? ('0' + d.getDate()) : ('' + d.getDate());
    const hours = (d.getHours() < 10) ? ('0' + d.getHours()) : ('' + d.getHours());
    const minutes = (d.getMinutes() < 10) ? ('0' + d.getMinutes()) : ('' + d.getMinutes());

    dateStringNow += year + month + day + hours + minutes;

    //console.log('dateStringNow: ' + dateStringNow + '\n');

    return parseInt(dateStringNow);
}



// update routes on server startup and then every 60 seconds
updateRoutes();

setInterval(() => {
    updateRoutes();
}, 60000);


// answer client request with stored route data
app.post('/route', (req, res) => {
    res.send(latestRoutes[req.body.name]);
})
