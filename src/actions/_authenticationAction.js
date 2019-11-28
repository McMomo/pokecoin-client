import { authenticationConstants } from '../helpers/constants'
import { userService } from '../services/user.service'

export const authenticationActions = {
    login
}

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }))

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user))
                },
                error => {
                    dispatch(failure(error))
                }
            )
    }

    function request(user) { return { type: authenticationConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: authenticationConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: authenticationConstants.LOGIN_FAILURE, error } }
}