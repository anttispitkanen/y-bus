

import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom';

import Home from './views/Home.jsx';
import Header from './views/Header.jsx';
import Footer from './views/Footer.jsx';
import NotFound from './views/NotFound.jsx';
import Keskusta from './views/Keskusta.jsx';
import Kauppi from './views/Kauppi.jsx';
import Hervanta from './views/Hervanta.jsx';

import './App.css';

const About = () => (
    <div>
        <h2>About</h2>
    </div>
)

const Topic = ({ match }) => (
    <div>
        <h3>{match.params.topicId}</h3>
    </div>
)

const Topics = ({ match }) => (
    <div>
        <h2>Topics</h2>
        <ul>
            <li>
                <Link to={`${match.url}/rendering`}>
                    Rendering with React
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/components`}>
                    Components
                </Link>
            </li>
            <li>
                <Link to={`${match.url}/props-v-state`}>
                    Props v. State
                </Link>
            </li>
        </ul>

        <Route path={`${match.url}/:topicId`} component={Topic}/>
        <Route exact path={match.url} render={() => (
                <h3>Please select a topic.</h3>
            )}/>
        </div>
    )

    const BasicExample = () => (
        <Router>
            <div className="App">

                <Header />


                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route path="/about" component={About}/>
                    <Route path="/topics" component={Topics}/>
                    <Route path="/keskusta" component={Keskusta}/>
                    <Route path="/hervanta" component={Hervanta}/>
                    <Route path="/kauppi" component={Kauppi}/>

                    <Route match="*" component={NotFound} />
                </Switch>
                <Footer />
            </div>
        </Router>
    )
    export default BasicExample;

    // <ul>
    //   <li><Link to="/">Home</Link></li>
    //   <li><Link to="/about">About</Link></li>
    //   <li><Link to="/topics">Topics</Link></li>
    // </ul>

    // <Miss component={NotFound} />
