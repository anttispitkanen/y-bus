import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';

import MainSchedules from './mainSchedules/MainSchedules';
import SingleUniPage from './singleUniPage/SingleUniPage';
import NotFound from './components/NotFound';
import About from './components/About';

const Routes = (props) => (
    <Switch>
        <Route path="/about" component={About} />
        <Route path="/:id" component={SingleUniPage} />
        <Route path="/" component={MainSchedules} />
        <Route path="*" component={NotFound} />
    </Switch>
);

export default Routes;
