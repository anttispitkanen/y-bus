import React, { Component } from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';

import './App.css';

import Routes from './Routes';
import Header from './components/Header';
import Footer from './components/Footer';
import AppReducer from './reducers';

const history = createHistory();
const store = createStore(AppReducer);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <div className="App">
                        <Header />
                        <h4 className="tagline">Buses between Tampere3 universities</h4>
                        <Routes />
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
