import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ROUTES_FETCH_SUCCESS } from '../../../constants';
import { routeShouldBeUpdated } from '../../../utils';
import SingleRouteInfo from './SingleRouteInfo';

class RouteCard extends Component {
    componentDidMount() {
        const { routes, status } = this.props.route;

        // if no routes exist in redux state, fetch them
        if (!routes || routes.length === 0 || status !== ROUTES_FETCH_SUCCESS) {
            // dispatch action to fetch routes
            const { routesFetch, routeName } = this.props;
            routesFetch(routeName);

        // if routes exist, only update if information is no longer valid
        } else {
            if (routeShouldBeUpdated(routes, new Date())) {
                const { routesFetch, routeName } = this.props;
                routesFetch(routeName);
            }
        }
    }

    render() {
        const { destName } = this.props;
        const { status, routes } = this.props.route;

        return (
            <div className="single-route">
                <i className="fa fa-bus" />
                <h5>To <span>{destName}</span>:</h5>

                <SingleRouteInfo
                    status={status}
                    route={routes[0]}
                />
            </div>
        );
    }
}

RouteCard.propTypes = {
    status: PropTypes.string,
    destName: PropTypes.string,
    routes: PropTypes.array,
    routesFetch: PropTypes.func
};

export default RouteCard;
