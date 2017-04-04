import React from 'react';

export default class SingleBusSchedule extends React.Component {
    render() {
        return(
            <div className="uni">
                <h2>{this.props.name}</h2>
                <img src={this.props.imgSrc}/>
                <ul>
                    { this.props.destinations.map(dest => {
                        return (
                            <li>Name: {dest.name}, Coords: {dest.coords}</li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}
