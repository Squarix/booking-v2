import React from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import Menu from "../Layouts/Menu";
import {Container} from "@material-ui/core";
import Footer from "../Layouts/Footer";
import ModeratorRoute from "../ModeratorRoute";
import Home from "./Home";
import NotFound from "../Layouts/NotFound";


export default function AdminRoutes(props) {
	return (
		<>
			<Menu/>
			<Container fixed>
				<Switch>
					<ModeratorRoute path={`/`} component={Home}/>
					<Route path='*' exact={true} component={NotFound} />
				</Switch>
			</Container>
			<Footer/>
		</>
	);
}

