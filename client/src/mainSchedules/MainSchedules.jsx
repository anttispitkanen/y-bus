import React from 'react';
import { unis } from '../unis.json';
import SingleUniSchedule from './singleUniSchedule/SingleUniSchedule';

const MainSchedules = () => (
    <div className="main-schedules-container">
        <div className="main-schedules">
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
    </div>
);

export default MainSchedules;
