import React, {useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Button,
    FormGroup
} from "reactstrap";
import "./Login.css";
import axios from 'axios';
import API, {plainAxiosInstance, securedAxiosInstance} from '../../axiosconfig/api';

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        plainAxiosInstance
            .post("signup", {email: email, password: password})
            .then((response) => signinSuccessful(response))
            .catch((error) => signinFailed(error));
    }

    function signinSuccessful(response) {
        console.log(response);
        console.log(!!response.data.csrf);
        console.log(!response.data.csrf);
        if (!response.data.csrf) {
            this.signinFailed(response);
            return;
        }
        localStorage.csrf = response.data.csrf;
        localStorage.signedIn = true;
        setError("");
        window.location.replace("/");
    }

    function signinFailed(error) {
        console.log("error");
        console.log(error);
        setError(
            (error.response && error.response.data && error.response.data.error) || ""
        );
        delete localStorage.csrf;
        delete localStorage.signedIn;
    }

    return (
        <div className="Login">
            <form onSubmit={ handleSubmit }>
                <FormGroup>
                    <label>Email</label>
                    <input
                        className="form-control"
                        autoFocus
                        name="email"
                        type="text"
                        value={ email }
                        onChange={ e => setEmail(e.target.value) }
                    />
                </FormGroup>
                <FormGroup>
                    <label>Password</label>
                    <input
                        className="form-control"
                        name="password"
                        type="password"
                        onChange={ e => setPassword(e.target.value) }
                        value={ password }
                    />
                </FormGroup>
                <Button block disabled={ !validateForm() } type="submit">
                    Login
                </Button>
            </form>
        </div>
    );
}