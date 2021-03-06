import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Button,
    FormGroup
} from "reactstrap";
import "./Login.css";
import { authenticationService } from "../../_services";
import {history} from "../../_helpers";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            error: ""
        }

        if (authenticationService.currentUserValue){
            this.props.history.push('/home')
        }
    }
    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        authenticationService.login(this.state.email, this.state.password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/" }}
                    this.props.history.push(from);
                })
            .catch(error => {
                this.props.history.push('/');
            });
    }
    render() {
        return (
            <div className="Login">
                <form onSubmit={ (e) =>{ this.handleSubmit(e) }  }>
                    <FormGroup>
                        <label>Email</label>
                        <input
                            className="form-control"
                            autoFocus
                            name="email"
                            type="text"
                            value={ this.state.email }
                            onChange={ e => this.setState({email: e.target.value}) }
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Password</label>
                        <input
                            className="form-control"
                            name="password"
                            type="password"
                            onChange={ e => this.setState({password: e.target.value}) }
                            value={ this.state.password }
                        />
                    </FormGroup>
                    <Button block disabled={ () => !this.validateForm() } type="submit">
                        Login
                    </Button>
                    <Button color={'primary'} block onClick={ () => { history.push('/signup') } }>
                        Sign In
                    </Button>
                </form>
            </div>
        );
    }

}

export { Login };