import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Button,
    FormGroup
  } from "reactstrap";
import "./Login.css";
import axios from 'axios';
import API, { plainAxiosInstance, securedAxiosInstance } from '../axiosconfig/api';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function validateForm() {
    return email.length > 0 && password.length > 0;
  }

  function handleSubmit(event) {
      //TODO: Get session
      // plainAxiosInstance.post
      event.preventDefault();
  }

  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <label>Email</label>
          <input
                className="form-control"
                autoFocus
                name="email"
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
        </FormGroup>
        <FormGroup>
          <label>Password</label>
          <input
                className="form-control"
                name="password"
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
              />
        </FormGroup>
        <Button block disabled={!validateForm()} type="submit">
          Login
        </Button>
      </form>
    </div>
  );
}