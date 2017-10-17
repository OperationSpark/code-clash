import React from 'react';
import { NavLink } from 'react-router-dom';
import SplashPageAnimation from './SplashPageAnimation';

const Home = () => (
  <div className="jumbotron text-center mono-text">
    <SplashPageAnimation />
    <h1 className="display-3 logo-text">Code Clash!</h1>
    <hr className="my-4" />

    <h3>Enter your name:</h3>
    <input type="text" className="form-control" placeholder="Username" aria-describedby="sizing-addon1" />

    <div className="spacer-v"></div>

    <h3>Choose your player:</h3>
      <p className="lead text-center">
        <NavLink to="play/1"><button type="button" className="btn btn-outline-primary">Player 1</button></NavLink>
        <button className="invisible">Player #</button>
        <NavLink to="play/2"><button type="button" className="btn btn-outline-success">Player 2</button></NavLink>
      </p>
  </div>
);

export default Home;
