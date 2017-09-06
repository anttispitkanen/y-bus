import React from 'react';
import SingleBusSchedule from './SingleBusSchedule.jsx';
import { unis } from '../unis.json';


export default class BusSchedules extends React.Component {

    render() {
        return(
            <div className="bus-schedules">
                <h4 className="tagline">Buses between Tampere3 universities</h4>
                { unis.map(uni => {
                    return (<SingleBusSchedule
                            name={uni.name}
                            imgSrc={uni.imgSrc}
                            key={uni.imgSrc}
                            destinations={uni.destinations}
                            coords={uni.coords}
                    />);
                })}
            </div>
        )
    }
}
