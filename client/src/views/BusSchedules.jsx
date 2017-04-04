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

    componentDidMount() {
        fetch('route', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'startCoords': UTAcoords,
                'destCoords': TUTcoords
            })
        }).then(res => {
            if (res.ok) { return res.json() }
            else { throw Error('error in client promise') }

        }).then(res => {
            if (res.error) {
                alert(res.error);
            } else {
                console.log(res);
            }

        })
    }


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
