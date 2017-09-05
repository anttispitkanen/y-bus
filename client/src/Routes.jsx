import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';

import BusSchedules from './views/BusSchedules';
import NotFound from './components/NotFound.jsx';
import Keskusta from './views/Keskusta.jsx';

// TODO: replace "/keskusta" with a generic route and component
const Routes = (props) => (
    <Switch>
        <Route path="/" component={BusSchedules} />
        <Route path="/keskusta" component={Keskusta} />
        <Route path="*" component={NotFound} />
    </Switch>
);

export default Routes;
