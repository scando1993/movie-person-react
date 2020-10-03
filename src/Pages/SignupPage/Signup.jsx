import './Signup.css'
import {authenticationService} from "../../_services";
import {Button, FormGroup} from "reactstrap";
import React from "react";
import {history} from "../../_helpers";

class Signup extends React.Component{
    state = {
        email: '',
        password: '',
    }

    handleSubmit(event) {
        event.preventDefault();
        authenticationService.signup(this.state.email, this.state.password)
            .then(
                user => {
                    const { from } = this.props.location.state || { from: { pathname: "/login" }}
                    this.props.history.push(from);
                })
            .catch(error => {
                this.props.history.push('/home');
            });
    }

    render() {
        return (
            <div className="Signup">
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
                    <Button block color={'success'} type="submit">
                        Create Account
                    </Button>
                    <Button block color={'danger'} onClick={ () => { history.push('/login') } }>
                        Go Back
                    </Button>
                </form>
            </div>
        );
    }
}

export { Signup }