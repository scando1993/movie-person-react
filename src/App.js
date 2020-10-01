import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Movies from './Pages/MoviePage/Movies';
import Login from './Pages/LoginPage/Login';
import People from "./Pages/PeoplePage/People";

const App = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/movies">
                <Movies/>
            </Route>
            <Route path="/people">
                <People/>
            </Route>
            <Route path="/login">
                <Login/>
            </Route>
        </Switch>
    </BrowserRouter>
);

export default App;