import { authenticationService } from '../_services';

const validStatusText = ['ok', 'created', 'no content'];

export function handleResponse(response){
    console.log(response);
    const data = response.data;
    if (validResponseText(response.statusText)){
        if ([401, 403].indexOf(response.status) !== -1){
            authenticationService.logout();
            // location.reload(true);
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}

function validResponseText(statusText){
    validStatusText.forEach((value, index) => {
       if (statusText.toLowerCase() === value)
           return true;
    });
    return false;
}