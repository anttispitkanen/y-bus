import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import classNames from 'classnames';

export default class Header extends React.Component {
    constructor() {
        super();
        this.toggleMenu = this.toggleMenu.bind(this);
        this.closeMenu = this.closeMenu.bind(this);
        this.state = {
            menuOpen: false
        }
    }

    toggleMenu(e) {
        this.setState({ menuOpen: !this.state.menuOpen });
    }

    closeMenu(e) {
        this.state.menuOpen &&
        this.setState({ menuOpen: false });
    }

    render() {
        return(
            <header className="header">
                <Link to="/">
                    <h1 className="main-heading"><span>Y</span>-bus</h1>
                </Link>

                <div
                    onClick={this.toggleMenu}
                    className="menu-button-container"
                >
                    <i className={classNames(
                        'hamburger',
                        { 'open': this.state.menuOpen },
                        'fa',
                        'fa-bars'
                    )} />
                </div>

                <nav
                    className={classNames('main-nav', { 'open': this.state.menuOpen })}
                    onClick={this.closeMenu}
                >
                    <NavLink className="main-nav-link" activeClassName="active" to="/" exact>Home</NavLink>
                    <NavLink className="main-nav-link" activeClassName="active" to="/keskusta">Keskusta</NavLink>
                    <NavLink className="main-nav-link" activeClassName="active" to="/kauppi">Kauppi</NavLink>
                    <NavLink className="main-nav-link" activeClassName="active" to="/hervanta">Hervanta</NavLink>
                    <NavLink className="main-nav-link" activeClassName="active" to="/about">About</NavLink>
                    <a className="main-nav-link" href="http://y-kampus.fi" target="_blank">Y-kampus</a>
                </nav>
            </header>
        );
    }
}
