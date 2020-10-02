import { authenticationService } from '../_services';

export function handleResponse(response){
    console.log(response);
    const data = response.data;
    if (response.statusText !== 'OK'){
        if ([401, 403].indexOf(response.status) !== -1){
            authenticationService.logout();
            // location.reload(true);
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}
