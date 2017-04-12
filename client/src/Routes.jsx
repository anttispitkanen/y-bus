import React from 'react';
import { Router, Route, browserHistory } from 'react-router';

import App from './App.js';
import NotFound from './views/NotFound.jsx';
import Keskusta from './views/Keskusta.jsx';

const Routes = (props) => (
    <Router history={browserHistory}>
        <Route path="/" component={App} />
        <Route path="/keskusta" component={Keskusta} />
        <Route path="*" component={NotFound} />
    </Router>
);

export default Routes;
