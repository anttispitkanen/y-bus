import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';

import MainSchedules from './mainSchedules/MainSchedules';
import NotFound from './components/NotFound.jsx';
import Keskusta from './views/Keskusta.jsx';

// TODO: replace "/keskusta" with a generic route and component
const Routes = (props) => (
    <Switch>
        <Route path="/:id" component={Keskusta} />
        <Route path="/" component={MainSchedules} />
        <Route path="*" component={NotFound} />
    </Switch>
);

export default Routes;
