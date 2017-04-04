import React from 'react';

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


                { this.props.destinations.map(dest => {
                    return (
                        <div className="bus-preview" key={dest.name}>
                            <span>Next bus to {dest.name}:</span>
                            <ul>
                                <li>Departure: XXX</li>
                                <li>Arrival: YYY</li>
                                <li>From: ZZZ</li>
                            </ul>
                        </div>
                    )
                })}
            </div>
        )
    }
}
