import React from 'react';

const WaitingForPlayers = ({ players }) => {
  const playerCount = players.length;
  return (
    <div>
      <div>
        <h1>{playerCount} players joined.</h1>
        <p>Waiting other player...</p>
      </div>
    </div>
  )
};

export default WaitingForPlayers;
