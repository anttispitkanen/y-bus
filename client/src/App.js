import React, { Component } from 'react';
import './App.css';

import BusSchedules from './views/BusSchedules.jsx';

class App extends Component {
  render() {
    return (
      <div className="App">
          <header>
              <a href="/">
                  <h1><span>Y</span>-bus</h1>
              </a>

          </header>

          <h4>Where are you?</h4>

          <BusSchedules />

          <footer>
              <a className="y-logo f-elem" href="http://y-kampus.fi" target="_blank">
                  <img src="./images/y-kampus-small.png" alt=""/>
              </a>

              <span className="copyright f-elem">
                  © 2017 <a href="https://github.com/anttispitkanen" target="_blank">Antti Pitkänen</a>
              </span>
          </footer>
      </div>
    );
  }
}

export default App;