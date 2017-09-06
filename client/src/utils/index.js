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

        //usually the first leg is walking to the stop
        if (data.legs[0].type === 'walk') {
            //in that case focus on the second leg
            if (data.legs.length > 1) {
                //grab the first leg's departure time as THE TIME THAT THE BUS DEPARTS
                lineNum = data.legs[1].code;
            } else {
                return 'It\'s fastest to walk';
            }

        } else {
            //this in case there is no walking to the stop
            //i.e. being on the stop already (hypotethical in this case)
            lineNum = 'It\'s fastest to walk';
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
        let stop;
        let stopCode;

        // Test if the first leg's last loc is a stop or not.
        // If it isn't, the whole thing is just walking.
        if (data.legs[0].locs.slice(-1).pop().name) {

            //assign the name of the stop (like "Sammonkatu 66")
            stop = data.legs[0].locs.slice(-1).pop().name;
            //assign the stop's code
            stopCode = data.legs[0].locs.slice(-1).pop().code;

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
