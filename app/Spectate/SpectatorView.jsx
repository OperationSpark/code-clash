import React, { Component } from 'react';
import { render } from 'react-dom';
import SpectatorPlayer from './SpectatorPlayer';

class SpectatorView extends Component {
  constructor() {
    super();
    this.scoreUp = this.scoreUp.bind(this);
  }

  scoreUp(player) {
    // const score = player.score += Math.floor(Math.random() * 100);
    const score = player.score += 100;
    this.setState({
      [player]: {
        score: score,
      }
    })
  }

  render() {
    const { player1, player2, testSpec, onWin } = this.props;
    return (
      <div>
        <div className="row">
          <div id="player1" className="col-md-6">
            <SpectatorPlayer 
              name={player1.name}
              score={player1.score}
              opponent={player2.score}
              player={1}
              testSpec={testSpec}
              code={player1.code}
              onWin={onWin.bind(this, player1)}
            />
          </div>
          <div id="player2" className="col-md-6">
            <SpectatorPlayer 
              name={player2.name}
              score={player2.score}
              opponent={player1.score}          
              player={2}
              testSpec={testSpec}
              code={player2.code}
              onWin={onWin.bind(this, player2)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <button className="btn btn-primary" onClick={ () => this.scoreUp(player1) }>Player 1 up</button>
          </div>
          <div className="col-md-6">
            <button className="btn btn-success" onClick={ () => this.scoreUp(player2) }>Player 2 up</button>
          </div>
        </div>
      </div>
    );
  }
}

export default SpectatorView;
