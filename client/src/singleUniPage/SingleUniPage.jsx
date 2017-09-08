import React from 'react';
import NotFound from '../components/NotFound';
import { unis } from '../unis.json';
import UniDepartures from './uniDepartures';
import './SingleUniPage.css';

const SingleUniPage = ({ match }) => {
    const uni = unis.find(uni => uni.id === match.params.id);

    if (!uni) {
        return <NotFound />;
    }

    return (
        <div className="single-uni-page-container">
            <div className="single-uni-page">
                <h4 className="next-buses-text">Next buses...</h4>
                <div className="uni-name-image">
                    <h2 className="single-uni-page-heading">
                        From {uni.name}
                    </h2>
                    <img
                        src={uni.imgSrc}
                        alt={`${uni.name} logo`}
                    />
                </div>

                {uni.destinations.map(destination => (
                    <UniDepartures
                        key={destination.route}
                        name={destination.name}
                        route={destination.route}
                    />
                ))}
            </div>
        </div>
    );
}

export default SingleUniPage;
