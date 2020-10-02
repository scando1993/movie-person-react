import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
    Button,
    FormGroup
} from "reactstrap";
import "./Login.css";
import { authenticationService } from "../../_services";

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
                    const { from } = this.props.location.state || { from: { pathname: "/home" }}
                    this.props.history.push(from);
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
                </form>
            </div>
        );
    }

}

export { Login };
// export default function Login() {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [error, setError] = useState("");
//
//     function validateForm() {
//         return email.length > 0 && password.length > 0;
//     }
//
//     function handleSubmit(event) {
//         event.preventDefault();
//
//         plainAxiosInstance
//             .post("signup", {email: email, password: password})
//             .then((response) => signinSuccessful(response))
//             .catch((error) => signinFailed(error));
//     }
//
//     function signinSuccessful(response) {
//         console.log(response);
//         console.log(!!response.data.csrf);
//         console.log(!response.data.csrf);
//         if (!response.data.csrf) {
//             this.signinFailed(response);
//             return;
//         }
//         localStorage.csrf = response.data.csrf;
//         localStorage.signedIn = true;
//         setError("");
//         window.location.replace("/");
//     }
//
//     function signinFailed(error) {
//         console.log("error");
//         console.log(error);
//         setError(
//             (error.response && error.response.data && error.response.data.error) || ""
//         );
//         delete localStorage.csrf;
//         delete localStorage.signedIn;
//     }
//
//     return (
//         <div className="Login">
//             <form onSubmit={ handleSubmit }>
//                 <FormGroup>
//                     <label>Email</label>
//                     <input
//                         className="form-control"
//                         autoFocus
//                         name="email"
//                         type="text"
//                         value={ email }
//                         onChange={ e => setEmail(e.target.value) }
//                     />
//                 </FormGroup>
//                 <FormGroup>
//                     <label>Password</label>
//                     <input
//                         className="form-control"
//                         name="password"
//                         type="password"
//                         onChange={ e => setPassword(e.target.value) }
//                         value={ password }
//                     />
//                 </FormGroup>
//                 <Button block disabled={ !validateForm() } type="submit">
//                     Login
//                 </Button>
//             </form>
//         </div>
//     );
// }