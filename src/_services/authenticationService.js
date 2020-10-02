import { BehaviorSubject } from 'rxjs';
import { handleResponse } from '../_helpers'
import { plainAxiosInstance } from "./axiosService";

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')))

export const authenticationService = {
    login,
    logout,
    signup,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
}

function signup(username, password){
    return plainAxiosInstance.post('signin', {
        email: username,
        password: password
    })
        .then(handleResponse)
        .then(data => {
            if (data.csrf){
                const user = {
                    email: username,
                    password: password
                };
                localStorage.setItem('currentUser', JSON.stringify(user));
                currentUserSubject.next(user);
                return user;
            }
        });
}

function login(username, password){
    return plainAxiosInstance.post('signup',{
        email: username,
        password: password
    })
        .then(handleResponse)
        .then(data => {
            if (data.csrf){
                const user = {
                    email: username,
                    password: password
                };
                localStorage.setItem('currentUser', JSON.stringify(user));
                currentUserSubject.next(user);
                return user;
            }
        });
}

function logout() {
    localStorage.removeItem('X-CSRF-TOKEN')
    localStorage.removeItem('signedIn')
    localStorage.removeItem('currentUser')
    currentUserSubject.next(null);
}