import React from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => (
  <div className="jumbotron">
    <h1 className="display-3 text-center">Code Clash!</h1>
    <hr className="my-4" />
      <p className="lead text-center">
        <button type="button" className="btn btn-outline-primary"><NavLink to="play/1">Player 1</NavLink></button>
        <button type="button" className="btn btn-outline-secondary"><NavLink to="play/2">Player 2</NavLink></button>
      </p>
  </div>
);

export default Home;
