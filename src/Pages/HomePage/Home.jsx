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
                    <h1>Test React Native</h1>
                    <p>Enter Movies or People to see the public exposed endpoints</p>
                </div>
            </>
        );
    }
}

export { Home };