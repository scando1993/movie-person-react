import { axiosService } from "./axiosService";
import { handleResponse } from "../_helpers";
import config from "../config/config";

const apiUrl = config.API_URL + ':' + config.API_PORT + "/";
const peopleUrl = apiUrl + 'api/' + config.BACKEND_VERSION + '/people';

export const peopleService = {
    all,
    get,
    create,
    update,
    _delete
};

function all() {
    return axiosService.plainAxiosInstance.get(peopleUrl)
        .then(handleResponse);
}

function get(id){
    const person_id = peopleUrl + '/' + id;
    return axiosService.plainAxiosInstance.get(person_id)
        .then(handleResponse);
}

function create(person){
    console.log(person)
    console.log(peopleUrl)
    // TODO: Validate person model
    return axiosService.securedAxiosInstance.post(peopleUrl, person)
        .then(handleResponse);
}

function update(id, person){
    const person_id = peopleUrl + '/' + id;
    return axiosService.securedAxiosInstance.put(person_id, person)
        .then(handleResponse);
}

function _delete(id){
    const person_id = peopleUrl + '/' + id;
    return axiosService.securedAxiosInstance.delete(person_id);
}