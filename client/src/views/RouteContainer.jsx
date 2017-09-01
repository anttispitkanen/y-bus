import React, { Component } from 'react';

import ScheduleRoute from './ScheduleRoute.jsx';

export default class RouteContainer extends Component {
    constructor() {
        super();
        this.state = {
            routes: null
        }
    }

    componentDidMount() {
        fetch('route', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': this.props.route
            })
        }).then(res => {
            if (res.ok) { return res.json() }
            else { throw Error('error in client promise') }

        }).then(res => {
            if (res.error) {
                alert(res.error);
            } else {
                console.log(res);

                this.setState({
                    routes: res
                })
            }
        })
    }

    render() {
        if (!this.state.routes) {
            return(<div>Loading...</div>)
        }

        return(
            <div className="uni">
                <h2>{this.props.destination}</h2>
                { this.state.routes.map((route, i) => {
                    return(<ScheduleRoute routeData={route} key={i}/>)
                })}
            </div>
        )
    }

}
