import { connect } from 'react-redux';
import { routesFetch } from '../../../actions/routeActions';
import RouteCard from './RouteCard';

const mapStateToProps = (state, ownProps) => ({
    route: state.routesReducer[ownProps.routeName],
    ...ownProps
});

export default connect(
    mapStateToProps,
    { routesFetch }
)(RouteCard);
