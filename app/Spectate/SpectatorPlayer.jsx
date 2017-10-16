import React, { Component } from 'react';
import NumberEasing from 'react-number-easing';
import Bang from './Bang';
import * as Emojione from 'react-svg-emojione';

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
    return <Emojione.innocent />
    } else if (this.win() === false) {
      return <Emojione.dizzy_face />;
    } else if (score === 0) {
      return <Emojione.sleepy />;
    } else if (score < 200) {
      return <Emojione.neutral_face />;
    } else if (score < 400) {
      return <Emojione.open_mouth />;
    } else if (score < 600) {
      return <Emojione.blush />;
    } else if (score < 800) {
      return <Emojione.smile />;
    } else if (score < 1000) {
      return <Emojione.heart_eyes />;
    }
  }

  render() {
    const { player, score, name, emoji } = this.props;
    return (
      <div className="col-6">
        <div className="face">
          <h1>Player { player + 1 } : { name }</h1>
          <div style={ this.style() } className="emoji">
            {/* <i className={ this.emoji() } id={'player' + player}></i> */}
            {/* <Emojione.slight_frown /> */}
            { this.emoji() }
          </div>
          <h1>
            <NumberEasing
              value={ score }
              speed={300}
            />
          </h1>
        </div>
        <Bang />
        <Bang />
        <Bang />
        <Bang />
        <Bang />
      </div>
    );
  }
}

export default SpectatorPlayer;
