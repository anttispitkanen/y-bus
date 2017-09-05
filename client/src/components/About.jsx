import React, { Component } from 'react';

export default class About extends Component {
    render() {
        return(
            <div className="about">
                <h4>About Y-bus</h4>

                <p>
                    Y-bus is a service that gives you the next bus routes between
                    the three Y-kampuses in Tampere: Keskusta (UTA), Hervanta (TUT)
                    and Kauppi (TAMK).
                </p>

                <p>
                    Y-bus is a third party provided service and not an official
                    part of Y-kampus or any of the above mentioned universities.
                    Y-bus is completely non-commercial and open source.
                </p>

                <p>
                    Although the bus schedules are fetched from the same API that
                    Repa Reittiopas uses, the correctness of the schedules cannot
                    be guaranteed 100%. Schedules are based on estimates, not
                    real-time data.
                </p>

                <p>
                    You can find the source code or contact the creator through <a 
                    href="https://github.com/anttispitkanen/y-bus"
                    target="_blank">GitHub</a>.
                </p>
            </div>
        )
    }
}
