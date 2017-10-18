import React from 'react';
import SpectatorPlayer from './SpectatorPlayer';

const WaitingForPlayers = ({ players }) => {
  const playerCount = players.length;
  const [ player1, player2 ] = players;
  return (
    <div className="row">
      <div className={ player1 ? "col-md-6 noshadow" : "col-md-6 shadow" }>
        <SpectatorPlayer 
          name={_.get(player1, 'name') || "?????"}
          score={_.get(player1, 'score') || null}
          opponent="0"
          player="1"
        />
      </div>
      <div className="col-md-6 shadow">
        <SpectatorPlayer 
          name="?????"
          score={null}
          opponent="0"          
          player="2"
        />
      </div>
    </div>
  )
};

export default WaitingForPlayers;
