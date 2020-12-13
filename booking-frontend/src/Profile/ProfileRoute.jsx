import React from 'react';
import { Switch, Route } from "react-router-dom";
import {Container} from "@material-ui/core";

import Profile from "./Profile";
import PrivateRoute from "../PrivateRoute";
import Bookings from "./Bookings";
import Menu from "../Layouts/Menu";
import Rents from "./Rents";
import NotFound from "../Layouts/NotFound";
import Rooms from "./Rooms";
import Analytics from "./Analytics/Analytics";


export default function ProfileRoute(props) {
	return (
  <>
    <Menu />
    <Container fixed>
      <Switch>
        <PrivateRoute path={`${props.match.path}/bookings`} component={Bookings} />
        <PrivateRoute path={`${props.match.path}/rents`} component={Rents} />
        <PrivateRoute path={`${props.match.path}/rooms`} component={Rooms} />
        <PrivateRoute path={`${props.match.path}/analytics`} component={Analytics} />
        <PrivateRoute path={`${props.match.path}/`} component={Profile} />
        <Route path='*' exact component={NotFound} />
      </Switch>
    </Container>
  </>
	);
}

