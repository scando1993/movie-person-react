import { axiosService } from "./axiosService";
import { handleResponse } from "../_helpers";
import config from "../config/config";

const apiUrl = config.API_URL + ':' + config.API_PORT + "/";
const moviesUrl = apiUrl + 'api/' + config.BACKEND_VERSION + '/movies';

export const movieService = {
    all,
    get,
    create,
    update,
    _delete
};

function all() {
    return axiosService
        .plainAxiosInstance
        .get(moviesUrl)
        .then(handleResponse);
}

function get(id){
    const movie_id = moviesUrl + '/' + id;
    return axiosService.plainAxiosInstance.get(movie_id)
        .then(handleResponse);
}

function create(movie){
    // TODO: Validate movie model
    return axiosService.securedAxiosInstance.post(moviesUrl, movie)
        .then(handleResponse);
}

function update(id, movie){
    const movie_id = moviesUrl + '/' + id;
    return axiosService.securedAxiosInstance.put(movie_id, movie)
        .then(handleResponse);
}

function _delete(id){
    const movie_id = moviesUrl + '/' + id;
    return axiosService.securedAxiosInstance.delete(movie_id)
        .then(handleResponse);
}