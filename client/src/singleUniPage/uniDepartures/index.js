import { connect } from 'react-redux';
import { routesFetch } from '../../actions/routeActions';
import UniDepartures from './UniDepartures';
import { unis } from '../../unis.json';

const mapStateToProps = (state, ownProps) => ({
    uni: state.routesReducer[ownProps.route],
    imgSrc: unis.find(uni => uni.name === ownProps.name).imgSrc
});

export default connect(
    mapStateToProps,
    { routesFetch }
)(UniDepartures);
