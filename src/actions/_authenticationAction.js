import { authenticationConstants } from '../helpers/constants'

const request = (username, password) => { 
    return { 
        type: authenticationConstants.LOGIN_REQUEST, 
        payload: {
            username,
            password
        } 
    } 
}
function success(user) { return { type: authenticationConstants.LOGIN_SUCCESS, user } }
function failure(error) { return { type: authenticationConstants.LOGIN_FAILURE, error } }

export const authenticationActions = {
    request,
    success,
    failure
}