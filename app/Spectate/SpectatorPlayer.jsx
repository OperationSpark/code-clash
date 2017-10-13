import React, { Component } from 'react';
import NumberEasing from 'react-number-easing';

class SpectatorPlayer extends Component {
  constructor() {
    super();
    this.win = this.win.bind(this);
    this.emoji = this.emoji.bind(this);
    this.style = this.style.bind(this);
  }
  
  style() {
    return {
      'animationDelay': Math.floor(Math.random() * 1000) + 'ms', 
    }
  };

  win() {
    const { score: thisScore, opponent: opponentScore } = this.props;
    if (thisScore >= 1000) {
      return true;
    } else if (opponentScore >= 1000) {
      return false;
    }
    return null;
  }

  emoji() {
    const { score } = this.props;
    if (this.win() === true) {
      return 'emoji em em-innocent';
    } else if (this.win() === false) {
      return 'emoji em em-astonished';
    } else if (score === 0) {
      return 'emoji em em-sleepy';
    } else if (score < 200) {
      return 'emoji em em-neutral_face';
    } else if (score < 400) {
      return 'emoji em em-open_mouth';
    } else if (score < 600) {
      return 'emoji em em-relaxed';
    } else if (score < 800) {
      return 'emoji em em-smile';
    } else if (score < 1000) {
      return 'emoji em em-heart_eyes';
    }
  }

  render() {
    const { player, score, name, emoji } = this.props;
    return (
      <div className="col-6">
        <div className="face">
          <h1>Player { player } : { name }</h1>
          <i style={ this.style() } className={ this.emoji() } id={'player' + player}></i>
          <h1>
            <NumberEasing
              value={ score }
              speed={300}
            />
          </h1>
        </div>
      </div>
    );
  }
}

export default SpectatorPlayer;
