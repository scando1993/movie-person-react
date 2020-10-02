import React from "react";
import { authenticationService } from "../../_services";

class Home extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            currentUser: authenticationService.currentUserValue,
            users: null
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <>
                <div>
                    <h1>Hi!</h1>
                    <p>You're logged in with React & JWT!!</p>
                    <h3>Users from secure api end point:</h3>
                </div>
            </>
        );
    }
}

export { Home };