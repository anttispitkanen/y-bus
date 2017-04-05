import React from 'react';
import SingleBusSchedule from './SingleBusSchedule.jsx';

// UTA coords
// "3328662.500000,6825009.000000"
const UTAcoords = '3328662.500000,6825009.000000';

// TUT coords
// "3332742.500000,6819846.000000"
const TUTcoords = '3332742.500000,6819846.000000';

// TAMK coords
// "3330355.500000,6826018.000000"
const TAMKcoords = '3330355.500000,6826018.000000';

const unis = [
    {
        name: 'Keskusta',
        imgSrc: 'images/utaen.png',
        coords: UTAcoords,
        destinations: [
            {
                name: 'Hervanta',
                coords: TUTcoords
            }, {
                name: 'Kauppi',
                coords: TAMKcoords
            }
        ]
    }, {
        name: 'Hervanta',
        imgSrc: 'images/tuten.png',
        coords: TUTcoords,
        destinations: [
            {
                name: 'Keskusta',
                coords: UTAcoords
            }, {
                name: 'Kauppi',
                coords: TAMKcoords
            }
        ]
    }, {
        name: 'Kauppi',
        imgSrc: 'images/tamken2.png',
        coords: TAMKcoords,
        destinations: [
            {
                name: 'Hervanta',
                coords: TUTcoords
            }, {
                name: 'Keskusta',
                coords: UTAcoords
            }
        ]
    }
]

export default class BusSchedules extends React.Component {

    render() {
        return(
            <div className="bus-schedules">
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
