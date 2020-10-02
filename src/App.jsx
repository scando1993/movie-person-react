import React from 'react';
import { Router, Switch, Route, Link } from 'react-router-dom';
import { Home } from "./Pages/HomePage";
import { Login } from './Pages/LoginPage';
import { authenticationService } from "./_services";
import { history } from "./_helpers";
import Movies from "./Pages/MoviePage/Movies";
import People from "./Pages/PeoplePage/People";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null
        }
    }

    componentDidMount() {
        authenticationService.currentUser.subscribe(x => this.setState({ currentUser: x }));
    }

    logout() {
        authenticationService.logout();
        history.push('/login')
    }

    render() {
        const { currentUser } = this.state;
        return (
            <Router history={ history }>
                <div>
                    <nav className="navbar navbar-expand navbar-dark bg-dark">
                        <div className="navbar-nav">
                            <Link to="/home" className="nav-item nav-link">Home</Link>
                            <Link to="/movies" className="nav-item nav-link">Movies</Link>
                            <Link to="/people" className="nav-item nav-link">People</Link>
                            { currentUser
                                ? <a onClick={this.logout} className="nav-item nav-link">Logout</a>
                                : <a onClick={this.logout} className="nav-item nav-link">Login</a>
                            }
                        </div>
                    </nav>
                    <Route path={"/login"} component={Login}/>
                    <Route path={"/home"} component={Home}/>
                    <Route path="/movies" component={Movies}/>
                    <Route path="/people" component={People}/>
                </div>
            </Router>
        );
    }
}
// const App = () => (
//     <BrowserRouter>
//         <Switch>
//             <Route path="/movies">
//                 <Movies/>
//             </Route>
//             <Route path="/people">
//                 <People/>
//             </Route>
//             <Route path="/login">
//                 <Login/>
//             </Route>
//         </Switch>
//     </BrowserRouter>
// );

export default App;