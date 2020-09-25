import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './containers/Main';
import Login from './containers/Login';

const App = () => (
  <BrowserRouter>
    <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
    </Switch>
  </BrowserRouter>
);

export default App;