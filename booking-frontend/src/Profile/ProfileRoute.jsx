import React from 'react';
import Profile from "./Profile";
import PrivateRoute from "../PrivateRoute";
import Bookings from "./Bookings";
import { Switch, Route } from "react-router-dom";
import Menu from "../Layouts/Menu";
import {Container} from "@material-ui/core";
import Footer from "../Layouts/Footer";
import Rents from "./Rents";
import NotFound from "../Layouts/NotFound";


export default function ProfileRoute(props) {
	return (
		<React.Fragment>
			<Menu/>
			<Container fixed>
				<Switch>
					<PrivateRoute path={`${props.match.path}/bookings`} component={Bookings}/>
					<PrivateRoute path={`${props.match.path}/rents`} component={Rents}/>
					<PrivateRoute path={`${props.match.path}/`} component={Profile}/>
					<Route path='*' exact={true} component={NotFound} />
				</Switch>
			</Container>
			<Footer/>
		</React.Fragment>
	);
}

