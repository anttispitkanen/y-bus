import React from 'react';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    render() {
        return(
            <header>
                <Link to="/">
                    <h1><span>Y</span>-bus</h1>
                </Link>
            </header>
        )
    }
}
