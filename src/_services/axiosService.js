import axios from "axios";
import config from "../config/config";

// const apiUrl = '{0}:{1}/'.format(config.API_URL, config.API_PORT);
const apiUrl = config.API_URL + ':' + config.API_PORT + "/";

;

const securedAxiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

const plainAxiosInstance = axios.create({
    baseURL: apiUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});

securedAxiosInstance.interceptors.request.use((_config) => {
    const method = _config.method.toUpperCase();
    if (method !== "OPTIONS" && method !== "GET") {
        _config.headers = {
            ..._config.headers,
            "X-CSRF-TOKEN": localStorage.getItem('X-CSRF-TOKEN'),
        };
    }
    return _config;
});

securedAxiosInstance.interceptors.response.use(null, (error) => {
    if (
        error.response &&
        error.response.config &&
        error.response.status === 401
    ) {
        // If 401 by expired access cookie, we do a refresh request
        return plainAxiosInstance
            .post("/refresh", {}, {headers: {"X-CSRF-TOKEN": localStorage.csrf}})
            .then((response) => {
                localStorage.setItem('X-CSRF-TOKEN', response.data.csrf)
                localStorage.setItem('signedIn', true);
                // After another successfull refresh - repeat original request
                let retryConfig = error.response.config;
                retryConfig.headers["X-CSRF-TOKEN"] = localStorage.csrf;
                return plainAxiosInstance.request(retryConfig);
            })
            .catch((error) => {
                localStorage.removeItem('X-CSRF-TOKEN')
                localStorage.removeItem('signedIn')
                // redirect to signin if refresh fails
                window.location.replace("/login");
                return Promise.reject(error);
            });
    } else {
        return Promise.reject(error);
    }
});

export const axiosService = {
    securedAxiosInstance,
    plainAxiosInstance
}

export { securedAxiosInstance, plainAxiosInstance };