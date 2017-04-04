import React from 'react';
import SingleBusSchedule from './SingleBusSchedule.jsx';


const unis = [
    {
        name: 'Keskusta',
        imgSrc: 'images/utaen.png',
        destinations: [
            {
                name: 'Hervanta',
                coords: 'hercoords :D'
            }, {
                name: 'Kauppi',
                coords: 'kaupcoords :D'
            }
        ]
    }, {
        name: 'Hervanta',
        imgSrc: 'images/tuten.png',
        destinations: [
            {
                name: 'Keskusta',
                coords: 'keskoords :DD'
            }, {
                name: 'Kauppi',
                coords: 'kaupcoords :D'
            }
        ]
    }, {
        name: 'Kauppi',
        imgSrc: 'images/tamken2.png',
        destinations: [
            {
                name: 'Hervanta',
                coords: 'hercoords :D'
            }, {
                name: 'Keskusta',
                coords: 'keskoords :DD'
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
                    />);
                })}
            </div>
        )
    }
}


// <div className="uni uta">
//     <h2>Keskusta</h2>
//
//     <img src="images/utaen.png" alt=""/>
//     <h3>To Hervanta:</h3>
//     <ul>
//         <li>Eka :D</li>
//         <li>Toka :D</li>
//         <li>Kolmas :D</li>
//     </ul>
//
//     <h3>To Kauppi:</h3>
//     <ul>
//         <li>Eka :D</li>
//         <li>Toka :D</li>
//         <li>Kolmas :D</li>
//     </ul>
// </div>
//
// <div className="uni tut">
//     <h2>Hervanta</h2>
//
//     <img src="images/tuten.png" alt="" />
//     <h3>To Keskusta:</h3>
//     <ul>
//         <li>Eka :D</li>
//         <li>Toka :D</li>
//         <li>Kolmas :D</li>
//     </ul>
//
//     <h3>To Kauppi:</h3>
//     <ul>
//         <li>Eka :D</li>
//         <li>Toka :D</li>
//         <li>Kolmas :D</li>
//     </ul>
// </div>
//
// <div className="uni tamk">
//     <h2>Kauppi</h2>
//
//     <img src="images/tamken2.png" alt="" />
//     <h3>To Hervanta:</h3>
//     <ul>
//         <li>Eka :D</li>
//         <li>Toka :D</li>
//         <li>Kolmas :D</li>
//     </ul>
//
//     <h3>To Keskusta:</h3>
//     <ul>
//         <li>Eka :D</li>
//         <li>Toka :D</li>
//         <li>Kolmas :D</li>
//     </ul>
// </div>
