import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Main from './Pages/MoviePage/Movies';
import Login from './Pages/LoginPage/Login';

const App = () => (
    <div className="app-routes">
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" component={Cms} />
      </Switch>
    </div>
  );