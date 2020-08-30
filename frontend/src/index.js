import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import configureStore from './store/store';
import jwt_decode from 'jwt-decode';

import { setAuthToken } from './util/session_api_util';
import { logout } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  // If a returning user has a session token stored in localStorage
  if (localStorage.jwtToken) {
    // Set the token as a common header for all axios requests
    setAuthToken(localStorage.jwtToken);
    // Decode the token to obtain the user's information
    const decodedUser = jwt_decode(localStorage.jwtToken);
    // Create a preconfigured state we can immediately add to our store
    const preloadedState = {
      session: { isAuthenticated: true, user: decodedUser },
    };

    store = configureStore(preloadedState);

    // get second
    const currentTime = Date.now() / 1000;

    // decodedUser.exp is the expire time
    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      // href: property  / replace: function replace('/login')
      // won't send the HTTP header
      // hred allow user to go back, replace don't
      window.location.href = "/login";
    }
  } else {
    store = configureStore({});
  }
  const root = document.getElementById("root");

  ReactDOM.render(<Root store={store} />, root);
});