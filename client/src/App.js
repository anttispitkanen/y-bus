import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import { BrowserRouter as Router } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';

import Routes from './Routes';
import Header from './components/Header';
import Footer from './components/Footer';
import AppReducer from './reducers';
import { AppSaga } from './sagas';
import './App.css';

const history = createHistory();

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    AppReducer,
    composeWithDevTools(
        applyMiddleware(sagaMiddleware)
    )
);

sagaMiddleware.run(AppSaga);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router history={history}>
                    <div className="App">
                        <Header />
                        <Routes />
                        <Footer />
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
