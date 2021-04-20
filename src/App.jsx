import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import UserDetail from './UserDetails/UserDetail';
const App = () => {
    return (
        <Router basename={window.location.pathname || ''}>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/home" component={Home}/>
                <Route path="/detail/:id" component={UserDetail}/>
            </Switch>
        </Router>
    );    
};

export default App;