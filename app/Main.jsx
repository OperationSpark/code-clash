import React from 'react';;
import { Switch, Route } from 'react-router-dom'

import Home from './Home.jsx';
import PlayerViewContainer from './PlayerView/PlayerViewContainer.jsx';
import SpectatorContainer from './Spectate/SpectatorContainer.jsx';

const Main = () => (
  <main className="container-fluid main">
    <Switch>
      <Route exact path='/' component={Home} />
      <Route path='/play/:playerId' component={PlayerViewContainer} />
      <Route exact path='/spectate' component={SpectatorContainer} />
    </Switch>
  </main>
);

export default Main;
