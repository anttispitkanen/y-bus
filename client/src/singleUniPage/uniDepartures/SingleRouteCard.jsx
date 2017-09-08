import React from 'react';
import {
    parseDeparture,
    parseArrival,
    parseLineNumber,
    parseStop
} from '../../utils';

const SingleRouteCard = ({ routeData, from, to }) => (
    <div className="single-route-card">
        <div className="icon-route-card-name-container">
            <i className="fa fa-bus" />
            <span>{from} – {to}</span>
        </div>

        <div className="single-route-card-info">
            <p>Depart: <br/><b>{parseDeparture(routeData)}</b></p>
            <p>Arrival: <br/><b>{parseArrival(routeData)}</b></p>
            <p>Bus: <br/><b>{parseLineNumber(routeData)}</b></p>
            <p>Stop: <br/>{parseStop(routeData)}</p>
        </div>
    </div>
);

export default SingleRouteCard;
