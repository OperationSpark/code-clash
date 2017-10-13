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
          player="1"
        />
        <SpectatorPlayer 
          name={player2.name}
          score={player2.score}
          opponent={player1.score}          
          player="2"
        />
        <button onClick={ () => this.scoreUp(player1) }>Player 1 up</button>
        {/* <Bang />
        <Bang />
        <Bang /> */}
      </div>
    );
  }
}

export default SpectatorView;
