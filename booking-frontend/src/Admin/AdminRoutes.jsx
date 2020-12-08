import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Container } from "@material-ui/core";
import Menu from "../Layouts/Menu";
import ModeratorRoute from "../ModeratorRoute";
import Home from "./Home";
import NotFound from "../Layouts/NotFound";


export default function AdminRoutes() {
  return (
    <>
      <Menu />
      <Container fixed>
        <Switch>
          <ModeratorRoute path="/" component={Home} />
          <Route path='*' exact component={NotFound} />
        </Switch>
      </Container>
    </>
  );
}

