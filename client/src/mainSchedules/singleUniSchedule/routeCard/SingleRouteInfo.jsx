import React from 'react';
import {
    ROUTES_FETCH,
    ROUTES_FETCH_FAIL
} from '../../../constants';
import {
    parseDeparture,
    parseArrival,
    parseLineNumber,
    parseStop
} from '../../../utils';

const SingleRouteInfo = ({ status, route }) => {
    if (!status || status === ROUTES_FETCH) {
        return (
            <div className="single-route-info">
                <div className="spinner" />
            </div>
        );
    }

    if (status === ROUTES_FETCH_FAIL) {
        return (
            <div className="single-route-info">
                <p>Something went wrong, please reload</p>
            </div>
        );
    }

    const routeData = Array.isArray(route) ? route[0] : route;

    return (
        <div className="single-route-info">
            <p>Depart: <br/><b>{parseDeparture(routeData)}</b></p>
            <p>Arrival: <br/><b>{parseArrival(routeData)}</b></p>
            <p>Bus: <br/><b>{parseLineNumber(routeData)}</b></p>
            <p>Stop: <br/>{parseStop(routeData)}</p>
        </div>
    );
}

export default SingleRouteInfo;
