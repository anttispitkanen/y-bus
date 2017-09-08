import React from 'react';
import {
    parseDeparture,
    parseArrival,
    parseLineNumber,
    parseStop
} from '../../utils';

const SingleRouteCard = ({ routeData }) => (
    <div className="single-route">
        <i className="fa fa-bus" />

        <div className="single-route-info">
            <p>Depart: <br/><b>{parseDeparture(routeData)}</b></p>
            <p>Arrival: <br/><b>{parseArrival(routeData)}</b></p>
            <p>Bus: <br/><b>{parseLineNumber(routeData)}</b></p>
            <p>Stop: <br/>{parseStop(routeData)}</p>
        </div>
    </div>
);

export default SingleRouteCard;
