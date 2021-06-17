const buildQueryString = (queryParams) => {
    return Object.keys(queryParams).map(
        key => `${key}=${queryParams[key]}`
    ).join('&')
} 

export const extractQueryString = (queryString) => {
    let queryParams = {}
    queryString.substring(1).split("&").forEach(element => {
        // console.log('element', element)
        const pair = element.split("=");
        queryParams[pair[0]] = pair[1]
    });
    return queryParams;
} 


export const TOKEN_KEY = "mf-token-key"

export const HOSTED_UI = process.env.REACT_APP_AUTH_HOSTED_URL + "?" +
buildQueryString({
    'client_id': process.env.REACT_APP_USER_POOL_WEB_CLIENT_ID,
    'response_type': 'token',
    'scope': 'aws.cognito.signin.user.admin',
    'redirect_uri': process.env.REACT_APP_AUTH_CALLBACK_URL
})