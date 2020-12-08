import React from "react";
import {Redirect, Route} from "react-router-dom";
import AuthService from "./_services/AuthService";

const authService = new AuthService();

export default function ModeratorRoute({component: Component, ...rest}) {
	return (
  <Route
    {...rest}
    render={props => authService.moderatorIn() ?
      <Component {...props} /> :
      <Redirect to={{pathname: '/403', state: {from: props.location}}} />}
  />
	);
};
