import * as APIUtil from '../util/session_api_util';
import jwt_decode from 'jwt-decode';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";
export const RECEIVE_USER_LOGOUT = "RECEIVE_USER_LOGOUT";
export const RECEIVE_USER_SIGN_IN = "RECEIVE_USER_SIGN_IN";

export const receiveCurrentUser = currentUser => ({
    type: RECEIVE_CURRENT_USER,
    currentUser
});

export const receiveUserSignIn = () => ({
    type: RECEIVE_USER_SIGN_IN
});
  
export const receiveErrors = errors => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});

export const logoutUser = () => ({
    type: RECEIVE_USER_LOGOUT
});

export const signup = (user) => (dispatch) =>
  APIUtil.signup(user).then(
    () => dispatch(receiveUserSignIn()),
    (err) => dispatch(receiveErrors(err.response.data))
  );
  //.catch(err => dispatch(receiveErrors(err.response.data)))

export const login = user => dispatch => (
    APIUtil.login(user).then(res => {
      // res of login return the token
      const { token } = res.data;
      // to get the json data, we need to do res.data. res contains more informatino about the json
      // setItem(key, value)
      localStorage.setItem("jwtToken", token);
      // set the token to auth to enter auth routes
      APIUtil.setAuthToken(token);
      // decoded is our current user with id, email and handle
      const decoded = jwt_decode(token);
      dispatch(receiveCurrentUser(decoded));
    })
    .catch(err => {
        dispatch(receiveErrors(err.response.data));
    })
)

export const logout = () => dispatch => {
    // .removeItem(key)
    localStorage.removeItem('jwtToken') 
    // remove the header (set the token to false)
    APIUtil.setAuthToken(false)
    dispatch(logoutUser())
};

