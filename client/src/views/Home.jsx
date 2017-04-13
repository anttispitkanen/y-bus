import React from 'react';

import BusSchedules from './BusSchedules.jsx';
import TestMap from './TestMap.jsx';

export default class Home extends React.Component {
    render() {
        return(
            <div className="home">
                <h4>Buses between Tampere3 universities</h4>

                <BusSchedules />

                <TestMap />
            </div>
        )
    }
}
