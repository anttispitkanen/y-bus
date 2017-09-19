import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ROUTES_FETCH_SUCCESS } from '../../../constants';
import SingleRouteInfo from './SingleRouteInfo';

class RouteCard extends Component {
    componentDidMount() {
        const { routes, status } = this.props.route;

        /**
         * FIXME: this way the routes stored to redux will only be updated with a hard refresth.
         * That's good for less rendering, but causes outdated route info to be shown if no
         * hard refresh is made.
         *
         * TODO: check route validity when mounting and only request when necessary
         */

        // do a check to avoid fetching already known routes
        if (!routes || routes.length === 0 || status !== ROUTES_FETCH_SUCCESS) {
            // dispatch action to fetch routes
            const { routesFetch, routeName } = this.props;
            routesFetch(routeName);
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
