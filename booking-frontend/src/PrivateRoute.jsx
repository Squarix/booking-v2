import React from "react";
import {Redirect, Route} from "react-router-dom";
import AuthService from "./_services/AuthService";

const authService = new AuthService();

export default function PrivateRoute({component: Component, ...rest}) {
	return (
  <Route
    {...rest}
    render={props => authService.loggedIn() ?
      <Component {...props} /> :
      <Redirect to={{pathname: '/sign-in', state: {from: props.location}}} />}
  />
	);
};
