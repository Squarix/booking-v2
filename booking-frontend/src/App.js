import React from 'react';
import './App.css';
import { Switch, Route }from 'react-router-dom';
import Homepage from './Home/Homepage';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import RoomRoutes from './Room/RoomRoutes';
import ProfileRoute from "./Profile/ProfileRoute";
import NotFound from "./Layouts/NotFound";
import AdminRoutes from "./Admin/AdminRoutes";
import Forbidden from "./Layouts/Forbidden";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route path="/sign-in" component={SignIn} />
        <Route path="/sign-up" component={SignUp} />
        <Route path="/rooms" component={RoomRoutes} />
        <Route path="/profile" component={ProfileRoute} />
        <Route path="/admin" component={AdminRoutes} />
        <Route path="/403" component={Forbidden} />
        <Route path='*' exact component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
