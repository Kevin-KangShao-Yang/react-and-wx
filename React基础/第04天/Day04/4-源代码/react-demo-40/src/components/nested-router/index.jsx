import React, { Component } from 'react';

import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'

import Login from './Login'
import Layout from './Layout'
import NotFound from '../router/NotFound'

class Index extends Component {
    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/layout" component={Layout}/>
                        <Redirect exact from="/" to="/login"/>
                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Index;