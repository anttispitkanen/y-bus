import React from 'react';
import { unis } from '../unis.json';
import SingleUniSchedule from './singleUniSchedule/SingleUniSchedule';

const MainSchedules = () => (
    <div className="bus-schedules">
        <h4 className="tagline">Buses between Tampere3 universities</h4>

        { unis.map(uni => (
            <SingleUniSchedule
                name={uni.name}
                key={uni.id}
                id={uni.id}
                imgSrc={uni.imgSrc}
                destinations={uni.destinations}
            />
        ))}
    </div>
);

export default MainSchedules;
