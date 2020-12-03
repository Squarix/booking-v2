import React from 'react';
import './App.css';
import Homepage from './Home/Homepage';
import SignIn from './Auth/SignIn';
import SignUp from './Auth/SignUp';
import RoomRoutes from './Room/RoomRoutes';
import { Switch, Route }from 'react-router-dom';
import ProfileRoute from "./Profile/ProfileRoute";
import Search from "./Search/Search";
import NotFound from "./Layouts/NotFound";
import AdminRoutes from "./Admin/AdminRoutes";
import Forbidden from "./Layouts/Forbidden";

import ReactAudioPlayer from 'react-audio-player';

import { apiUrl } from "./_services/config";

function App() {
  const song = `${apiUrl}/songs/${Math.round(Math.random()) ? 'HBTB' : 'DGTM'}.mp3`;
  return (
    <div className="App">
      <Switch>
        <Route exact path={'/'} component={Homepage}/>
        <Route path={'/sign-in'} component={SignIn} />
        <Route path={'/sign-up'} component={SignUp} />
        <Route path={'/search'} component={Search} />
        <Route path={'/rooms'} component={RoomRoutes}/>
        <Route path={'/profile'} component={ProfileRoute} />
        <Route path={'/admin'} component={AdminRoutes} />
        <Route path={'/403'} component={Forbidden} />
        <Route path='*' exact={true} component={NotFound} />
      </Switch>
      {/*<ReactAudioPlayer*/}
      {/*  src={song}*/}
      {/*  autoPlay*/}
      {/*  volume={0.02}*/}
      {/*/>*/}
    </div>
  );
}

export default App;
