import React from 'react';
import SingleRoute from './SingleRoute.jsx';


export default class SingleBusSchedule extends React.Component {


    render() {

        return(
            <div className="uni">
                <a href="#">
                    <div className="uni-name-image">
                        <h2>{this.props.name}</h2>
                        <img src={this.props.imgSrc} alt="" />
                    </div>
                </a>


                { this.props.destinations.map((dest, i) => {

                    return(
                        <SingleRoute
                            destName={dest.name}
                            depName={this.props.name}
                            startCoords={this.props.coords}
                            destCoords={dest.coords}
                            key={i}
                        />
                    )
                })}


            </div>
        )
    }
}
