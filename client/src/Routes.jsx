import React from 'react';
import {
    Switch,
    Route
} from 'react-router-dom';

import MainSchedules from './mainSchedules/MainSchedules';
import SingleUniPage from './singleUniPage/SingleUniPage';
import NotFound from './components/NotFound';
import About from './components/About';
import Keskusta from './views/Keskusta';

// TODO: replace "/keskusta" with a generic route and component
const Routes = (props) => (
    <Switch>
        <Route path="/about" component={About} />
        {/* FOR TESTING */}
        <Route path="/testikeskusta" component={Keskusta} />
        <Route path="/:id" component={SingleUniPage} />
        <Route path="/" component={MainSchedules} />
        <Route path="*" component={NotFound} />
    </Switch>
);

export default Routes;
