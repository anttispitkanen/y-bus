import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import RouteCard from './routeCard';

const SingleUniSchedule = ({
    name,
    id,
    imgSrc,
    destinations
}) => (
    <div className="uni">
        <Link to={`/${id}`}>
            <div className="uni-name-image">
                <h2>{name}</h2>
                <img src={imgSrc} alt={`${name} logo`} />
            </div>
        </Link>

        {destinations.map(destination => (
            <RouteCard
                routeName={destination.route}
                destName={destination.name}
                key={destination.route}
            />
        ))}
    </div>
);

SingleUniSchedule.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    imgSrc: PropTypes.string.isRequired,
    destinations: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string.isRequired,
        route: PropTypes.string.isRequired
    })).isRequired
};

export default SingleUniSchedule;
