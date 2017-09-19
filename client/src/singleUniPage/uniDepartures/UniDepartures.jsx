import React, { Component } from 'react';
import {
    ROUTES_FETCH,
    ROUTES_FETCH_FAIL
} from '../../constants';
import { routeShouldBeUpdated } from '../../utils';
import SingleRouteCard from './SingleRouteCard';

class UniDepartures extends Component {
    componentDidMount() {
        window.scrollTo(0, 0);

        const { route, uni, routesFetch } = this.props;

        // Fetch routes if they are not already in state
        if (!uni || !uni.routes || uni.routes.length === 0) {
            routesFetch(route);

        // if routes exist in state, only update them if they are no longer valid
        } else {
            if (routeShouldBeUpdated(uni.routes, new Date())) {
                routesFetch(route);
            }
        }
    }

    render() {
        const { status } = this.props.uni;

        if (!status || status === ROUTES_FETCH) {
            return <div className="spinner" />
        }

        if (status === ROUTES_FETCH_FAIL) {
            return <p>Oops, something went wrong, please reload.</p>
        }

        return (
            <div className="uni">
                <div className="uni-name-image-container">
                    <h4>To {this.props.name}</h4>
                    <img src={this.props.imgSrc} alt={`${this.props.name} logo`} />
                </div>

                {this.props.uni.routes.map((route, i) => (
                    <SingleRouteCard
                        key={i}
                        routeData={route[0]}
                        from={this.props.from}
                        to={this.props.name}
                    />
                ))}
            </div>
        );
    }
}

export default UniDepartures;
