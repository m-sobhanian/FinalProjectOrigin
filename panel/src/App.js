import React, { Component } from 'react';
import './App.css';
import {RegisterPage, DashboardAdmin} from './pages';
import {LoginPage} from './pages';
import {Dashboard} from './pages';

import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import PrivateRouter from './router/PrivateRouter';


class App extends Component {
  render() {
    return (
      <div className="App">
      
        <Router basename="/panel">
          <Switch>
            <Route exact path="/register" component={RegisterPage}></Route>
            <Route exact path="/login" component={LoginPage}></Route>
            <PrivateRouter path="/dashboard" component={Dashboard}/>
            <PrivateRouter path="/dashboardAdmin" component={DashboardAdmin}/>
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
