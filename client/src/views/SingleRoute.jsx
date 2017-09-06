import React from 'react';

export default class SingleRoute extends React.Component {

    constructor() {
        super();
        this.state = {
            fetched: false
        }
    }

    componentDidMount() {

        fetch('route', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': this.props.depName + this.props.destName
            })
        }).then(res => {
            if (res.ok) { return res.json() }
            else { throw Error('error in client promise') }

        }).then(res => {
            if (res.error) {
                alert(res.error);
            } else {
                let routeData = res[0][0];
                //console.log(routeData);
                console.log(res);

                this.setState({
                    fetched: true,
                    departure: this.parseDeparture(routeData),
                    arrival: this.parseArrival(routeData),
                    lineNum: this.parseLineNumber(routeData),
                    stop: this.parseStop(routeData)
                })
            }

        })
        .catch(e => console.error(e));
    }

    parseDeparture(data) {
        let departure;

        //usually the first leg is walking to the stop
        if (data.legs[0].type === 'walk') {
            //in that case focus on the second leg
            if (data.legs.length > 1) {
                //grab the first leg's departure time as THE TIME THAT THE BUS DEPARTS
                departure = data.legs[1].locs[0].depTime;
            } else {
                return 'It\'s fastest to walk';
            }

        } else {
            //this in case there is no walking to the stop
            //i.e. being on the stop already (hypotethical in this case)
            departure = data.legs[0].locs[0].depTime;
        }

        return departure.substr(8, 2) + '.' + departure.substr(10, 2);

    }

    parseArrival(data) {
        let arrival;
        //the arrival time at the last leg's last location, pretty simple
        arrival = data.legs.slice(-1).pop().locs.slice(-1).pop().arrTime;
        arrival = arrival.substr(8, 2) + '.' + arrival.substr(10, 2);
        return arrival;
    }

    parseLineNumber(data) {
        let lineNum;

        //usually the first leg is walking to the stop
        if (data.legs[0].type === 'walk') {
            //in that case focus on the second leg
            if (data.legs.length > 1) {
                //grab the first leg's departure time as THE TIME THAT THE BUS DEPARTS
                lineNum = data.legs[1].code;
            } else {
                return 'It\'s fastest to walk';
            }

        } else {
            //this in case there is no walking to the stop
            //i.e. being on the stop already (hypotethical in this case)
            lineNum = 'It\'s fastest to walk';
        }
        return lineNum;
    }

    //returns the line number as a link to the real time monitoring in Lissu
    parseStop(data) {
        let stop;
        let stopCode;

        //test if the first leg's last loc is a stop or not
        //if it isn't, the whole thing is just walking
        if (data.legs[0].locs.slice(-1).pop().name) {

            //assign the name of the stop (like "Sammonkatu 66")
            stop = data.legs[0].locs.slice(-1).pop().name;
            //assign the stop's code
            stopCode = data.legs[0].locs.slice(-1).pop().code;

        } else {
            return 'Just walk :DD';
        }

        let stopQueryString = stop.split(' ').join('+');
        let linkToLissu = `http://lissu.tampere.fi/?mobile=1&key=${stopQueryString}&stop=${stopCode}`;

        return(<a href={linkToLissu} target="_blank">{stop}</a>);
    }


    render() {
        if (!this.state.fetched) {
            return(

                <div className="single-route">
                    <i className="fa fa-bus"></i>
                    <h5>To <span>{this.props.destName}</span>:</h5>

                    <div className="single-route-info">
                        <div className="spinner"></div>
                    </div>

                </div>

            )
        }

        return(
            <div className="single-route">
                <i className="fa fa-bus"></i>
                <h5>To <span>{this.props.destName}</span>:</h5>

                <div className="single-route-info">
                    <p>Depart: <br/><b>{this.state.departure}</b></p>
                    <p>Arrival: <br/><b>{this.state.arrival}</b></p>
                    <p>Bus: <br/><b>{this.state.lineNum}</b></p>
                    <p>Stop: <br/>{this.state.stop}</p>
                </div>

            </div>

        )
    }
}
