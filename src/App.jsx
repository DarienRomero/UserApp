import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
const App = () => {
    return (
        <Router basename={process.env.PUBLIC_URL}>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/home" component={Home}/>
            </Switch>
        </Router>
    );    
};

export default App;