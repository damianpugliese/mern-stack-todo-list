// Set config/headers and token
export const configToken = () => {
    // Get token from localstorage
    const token = localStorage.getItem('token');

    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // If token, add headers
    if (token) {
        config.headers['x-auth-token'] = token;
    }

    return config;

}