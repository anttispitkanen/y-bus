import React from 'react';

import RouteContainer from './RouteContainer.jsx';

export default class Keskusta extends React.Component {

    constructor() {
        super();
        this.state = {
            routes: [
                {
                    route: 'KeskustaKauppi',
                    destination: 'To Kauppi'
                }, {
                    route: 'KeskustaHervanta',
                    destination: 'To Hervanta'
                }
            ]
        }
    }


    render() {
        return(
            <div className="uni-expanded">

                <div className="uni-name-image">
                    <h2>Keskusta</h2>
                    <img src="images/utaen-small.png" alt="" />
                </div>



                { this.state.routes.map((route, i) => {

                    return(
                        <RouteContainer
                            route={route.route}
                            destination={route.destination}
                            key={i}
                        />
                    )
                })}
            </div>
        )
    }
}
