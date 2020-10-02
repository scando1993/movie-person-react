export function handleTokenResponse(response){
    console.log(response);
    //TODO: check csrf token validity
    if (response.csrf){
        localStorage.setItem('X-CSRF-TOKEN', response.csrf);
        localStorage.setItem('signedIn', true);
    }

    return true;
}