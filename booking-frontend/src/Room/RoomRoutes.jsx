import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from "../PrivateRoute";
import NewRoom from "./NewRoom";
import ViewRoom from "./ViewRoom";
import NotFound from "../Layouts/NotFound";
import UpdateRoom from "./UpdateRoom";
import Search from "../Search/Search";


export default function RoomRoutes(props) {
  return (
    <Switch>
      <PrivateRoute path={`${props.match.path}/create`} component={NewRoom}/>
      <PrivateRoute path={`${props.match.path}/:id(\\d+)/update`} exact={true} component={UpdateRoom}/>
      <Route path={`${props.match.path}/:id(\\d+)`} exact={true} component={ViewRoom}/>
      <Route path={`${props.match.path}/`} exact={true} component={Search}/>
      <Route path='*' exact={true} component={NotFound}/>
    </Switch>
  );
}

