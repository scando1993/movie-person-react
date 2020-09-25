import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './containers/Main';
import Login from './containers/Login';

const App = () => (
    <div className="app-routes">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Cms} />
      </Switch>
    </div>
  );