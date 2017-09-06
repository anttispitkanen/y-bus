import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SingleRouteInfo from './SingleRouteInfo';

class RouteCard extends Component {
    componentDidMount() {
        // dispatch action to fetch routes
        const { routesFetch, routeName } = this.props;
        routesFetch(routeName);
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
