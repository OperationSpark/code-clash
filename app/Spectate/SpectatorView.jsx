import React, { Component } from 'react';
import { render } from 'react-dom';
import SpectatorPlayer from './SpectatorPlayer';
// import Bang from './bang';

class SpectatorView extends Component {
  constructor() {
    super();
    this.scoreUp = this.scoreUp.bind(this);
  }

  scoreUp(player) {
    const score = player.score += Math.floor(Math.random() * 100);
    this.setState({
      [player]: {
        score: score,
      }
    })
  }

  render() {
    const { player1, player2 } = this.props;
    return (
      <div className="row">
        <SpectatorPlayer 
          name={player1.name}
          score={player1.score}
          opponent={player2.score}
          player={player1.id}
        />
        <SpectatorPlayer 
          name={player2.name}
          score={player2.score}
          opponent={player1.score}          
          player={player2.id}
        />
        <button onClick={ () => this.scoreUp(player1) }>Player 1 up</button>
        <button onClick={ () => this.scoreUp(player2) }>Player 2 up</button>
      </div>
    );
  }
}

export default SpectatorView;
