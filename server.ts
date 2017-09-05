'use strict';

const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const { URL, URLSearchParams } = require('url');

const app = express();

app.set('port', (process.env.PORT || 5000));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(app.get('port'), () => {
    console.log('listening on port ' + app.get('port'));
});

// University coordinates
const UTA_COORDS: string = '3328662.500000,6825009.000000';
const TUT_COORDS: string = '3332742.500000,6819846.000000';
const TAMK_COORDS: string = '3330355.500000,6826018.000000';

interface RouteCoords {
    name: string;
    from: string;
    to: string;
}

const routeCoords: RouteCoords[] = [
    {
        name: 'KeskustaHervanta',
        from: UTA_COORDS,
        to: TUT_COORDS
    }, {
        name: 'KeskustaKauppi',
        from: UTA_COORDS,
        to: TAMK_COORDS
    }, {
        name: 'HervantaKeskusta',
        from: TUT_COORDS,
        to: UTA_COORDS
    }, {
        name: 'HervantaKauppi',
        from: TUT_COORDS,
        to: TAMK_COORDS
    }, {
        name: 'KauppiKeskusta',
        from: TAMK_COORDS,
        to: UTA_COORDS
    }, {
        name: 'KauppiHervanta',
        from: TAMK_COORDS,
        to: TUT_COORDS
    }
];

interface Coordinate {
    x: number;
    y: number;
}

interface Loc {
    arrTime:    string;
    depTime:    string;
    coord:      Coordinate;
    // property name exitst but can be null
    name:       string | null;
    code?:      string;
    shortCode?: string;
}

interface Leg {
    duration:   number;
    length:     number;
    // type is "walk" for walking or "1" for bus
    type:       string;
    // code is the number of the bus line, undefined if walking
    code?:      string;
    locs:       Loc[];
}

interface Route {
    duration:   number;
    length:     number;
    legs:       Leg[];
}

interface Routes {
    KeskustaHervanta:   [ Route[] ] | null;
    KeskustaKauppi:     [ Route[] ] | null;
    HervantaKeskusta:   [ Route[] ] | null;
    HervantaKauppi:     [ Route[] ] | null;
    KauppiKeskusta:     [ Route[] ] | null;
    KauppiHervanta:     [ Route[] ] | null;
}

const latestRoutes: Routes = {
    KeskustaHervanta:   null,
    KeskustaKauppi:     null,
    HervantaKeskusta:   null,
    HervantaKauppi:     null,
    KauppiKeskusta:     null,
    KauppiHervanta:     null
};

const API_URL: string = 'http://api.publictransport.tampere.fi/prod/';

const setParams = (params, from: string, to: string): void => {
    params.set('user', process.env.API_USER);
    params.set('pass', process.env.API_PW);
    params.set('request', 'route');
    params.set('detail', 'limited');
    params.set('from', from);
    params.set('to', to);
    params.set('change_cost', 20);
    params.set('walk_cost', 2);
}

/**
 * This function updates all the routes that should be updated,
 * all of them on the first call.
 */
const updateRoutes = async (): Promise<any> => {
    const now: Date = new Date();

    routeCoords.map(async (route) => {
        const url = new URL(API_URL);
        const params = new URLSearchParams();
        setParams(params, route.from, route.to);
        url.search = params.toString();

        const searchUrl: string = url.toString();

        // if there's no previous route info at all, or
        // it is out of date, update route from API
        if (!latestRoutes[route.name] || routeShouldBeUpdated(latestRoutes[route.name], now)) {
            try {
                const response = await axios.get(searchUrl);
                latestRoutes[route.name] = response.data;
                console.log(`${route.name} updated at ${now.toLocaleTimeString()}`);
            } catch (e) {
                console.error(e);
            }
        }
    });
}

const routeShouldBeUpdated = (previousRoute: [ Route[] ] | null, now: Date): boolean => {
    if (!previousRoute) {
        return true;
    }

    const departure: Route = previousRoute[0][0];
    const departureTime: Date | null = parseDepartureTime(departure);

    if (!departureTime) {
        return true;
    }
    /**
     * This part is problematic in a way.
     *
     * We compare current time to the time that the API gives us to
     * START WALKING TO THE STOP in order to make it in time.
     *
     * This works if the user is at the campus and is looking for the next
     * bus they could make it to. This however does not work for someone
     * standing at the bus stop, because it may skip some buses that are
     * coming sooner.
     *
     * Instead of writing complex logic, we'll try adding a threshold of
     * 3 minutes (18000ms) to counter the problems of the time it takes to
     * walk to the stop.
     *
     * This means that the API calculates the time to walk from a given
     * location to the stop to be X minutes, and we treat that as X-3 minutes.
     * In other words we over estimate a person's walking speed by three minutes.
     *
     * FIXME: this does not work as it causes in worst cases (especially from Kuntokatu to TUT)
     * a problem when already passed times are shown.
     *
     * TODO: compare the time of the bus departing, which is (usually) not the first loc of the first leg.
     */
    const diff = departureTime.getTime() - now.getTime();
    return diff <= -180000;
}

const parseDepartureTime = (route: Route): Date | null => {
    // API returns times as strings "YYYYMMDDHHMM",
    // parse that as a date
    try {
        const depString: string = route.legs[0].locs[0].depTime;

        const year: number = parseInt(depString.slice(0, 4));
        const month: number = parseInt(depString.slice(4, 6)) - 1;
        const day: number = parseInt(depString.slice(6, 8));
        const hour: number = parseInt(depString.slice(8, 10));
        const minute: number = parseInt(depString.slice(10, 12));
        return new Date(year, month, day, hour, minute);
    } catch (err) {
        console.error(err);
        return null;
    }
}

// update routes on server startup...
updateRoutes();

// ...and then every 60 seconds
setInterval(() => {
    updateRoutes();
}, 60000);

// respond to the client requests with the stored route data
app.post('/route', (req, res) => {
    const { name } = req.body;

    // if the route doesn't exist yet, fetch all routes before responding
    if (!latestRoutes[name]) {
        updateRoutes()
        .then(() => {
            res.send(latestRoutes[name])
        })
        .catch(err => {
            console.error(err);
            res.status(500);
            res.send({ 'error': 'something went wrong' });
        });
    } else {
        // if route is already known, respond with it
        res.send(latestRoutes[name]);
    }
});

// TODO: serve all requests to '*' with index.html