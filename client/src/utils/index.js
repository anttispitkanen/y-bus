/**
 * Utility functions.
 */
import React from 'react';

// takes a route object and returns departure time as "HH.MM"
export const parseDeparture = data => {
    try {
        // store the departure time as string "YYYYMMDDHHMM" as returned
        // by the api
        let departure;

        //usually the first leg is walking to the stop
        if (data.legs[0].type === 'walk') {
            //in that case focus on the second leg
            if (data.legs.length > 1) {
                //grab the first leg's departure time as THE TIME THAT THE BUS DEPARTS
                departure = data.legs[1].locs[0].depTime;
            } else {
                // if there's only one leg and its type is 'walk'
                return 'It\'s fastest to walk';
            }
        } else {
            //this in case there is no walking to the stop
            //i.e. being on the stop already (hypotethical in this case)
            departure = data.legs[0].locs[0].depTime;
        }

        // parse "HH.MM" from the string
        return departure.substr(8, 2) + '.' + departure.substr(10, 2);
    } catch (e) {
        console.error(e);
        return 'Can\'t parse departure';
    }
}

// takes a route object and returns arrival time as "HH.MM"
export const parseArrival = data => {
    try {
        // Arrival time is a string "YYYYMMDDHHMM" as returned by the api.
        // Arrival time of the last loc of the last leg.
        const arrival = data.legs.slice(-1).pop().locs.slice(-1).pop().arrTime;
        return arrival.substr(8, 2) + '.' + arrival.substr(10, 2);
    } catch (e) {
        console.error(e);
        return 'Can\'t parse arrival';
    }
}

// takes a route object, returns the line number as string
export const parseLineNumber = data => {
    try {
        let lineNum;

        // usually the first leg is walking to the stop
        if (data.legs[0].type === 'walk') {
            // in that case focus on the second leg
            if (data.legs.length > 1) {
                // grab the first bus' code
                lineNum = data.legs[1].code;
            } else {
                // the whole route is walking
                return 'It\'s fastest to walk';
            }

        } else {
            // the first leg is a bus, grab the code from that
            lineNum = data.legs[0].code;
        }
        return lineNum;
    } catch (e) {
        console.error(e);
        return 'Can\'t parse lineNum';
    }
}

//returns the line number as a link to the real time monitoring in Lissu
export const parseStop = data => {
    try {
        let stop; // the name of the stop (like "Sammonkatu 66")
        let stopCode;

        // if route starts from a bus stop = the first loc is a stop
        if (data.legs[0].locs[0].name) {
            stop = data.legs[0].locs[0].name;
            stopCode = data.legs[0].locs[0].code;

        // Test if the first leg's last loc is a stop or not.
        } else if (data.legs[0].locs.slice(-1).pop().name) {
            stop = data.legs[0].locs.slice(-1).pop().name;
            stopCode = data.legs[0].locs.slice(-1).pop().code;

        // If it isn't, the whole thing is just walking.
        } else {
            return 'It\'s best to walk';
        }

        const stopQueryString = stop.split(' ').join('+');
        const linkToLissu = `http://lissu.tampere.fi/?mobile=1&key=${stopQueryString}&stop=${stopCode}`;

        return(<a href={linkToLissu} target="_blank">{stop}</a>);
    } catch (e) {
        console.error(e);
        return 'Can\'t parse stop';
    }
}

// helper function for doing a console.error() only if we are NOT
// in testing environment
export const logError = errorMsg => {
    // Jest sets NODE_ENV='test', check that here
    if (process.env.NODE_ENV === 'test') {
        // we don't want to log expected errors in tests
        return;
    }
    return console.error(errorMsg);
}

// finds and returns the departure time string for the bus departing
export const findDepartureTimeString = route => {
    /**
     * If the first leg is bus, return the departure time for that leg.
     * Otherwise if the first leg is walking, return the departure time
     * for the second leg.
     */
    return route.legs[0].type === 'walk'
            ? route.legs[1].locs[0].depTime
            : route.legs[0].locs[0].depTime;
}

export const parseDepartureAsDate = depString => {
    // API returns times as strings "YYYYMMDDHHMM",
    // parse that as a date
    try {
        const year = parseInt(depString.slice(0, 4), 10);
        const month = parseInt(depString.slice(4, 6), 10) - 1;
        const day = parseInt(depString.slice(6, 8), 10);
        const hour = parseInt(depString.slice(8, 10), 10);
        const minute = parseInt(depString.slice(10, 12), 10);
        return new Date(year, month, day, hour, minute);
    } catch (err) {
        console.error(err);
        return null;
    }
}

/**
 * Returns true if route information is no longer valid, false otherwise.
 * @param {[Route []]} previousRoute the previously stored route
 * @param {Date} now the Date object for current time
 */
export const routeShouldBeUpdated = (previousRoute, now) => {
    if (!previousRoute) {
        return true; // if there's no previous route, it should be updated
    }

    const departure = previousRoute[0][0];
    const departureTime = parseDepartureAsDate(findDepartureTimeString(departure));

    if (!departureTime) {
        return true;
    }

    // Return true if current time is more than the time the previous departure time is.
    return departureTime.getTime() < now.getTime();
}
