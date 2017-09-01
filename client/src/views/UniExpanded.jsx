import React, { Component } from 'react';


export default class UniExpanded extends Component {


    render() {
        return(
            <div className="uni-expanded">

                <div className="uni-name-image">
                    <h2>{this.props.name}</h2>
                    <img src={this.props.imgSrc} alt="" />
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
