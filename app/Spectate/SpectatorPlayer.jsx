import React, { Component } from 'react';
import NumberEasing from 'react-number-easing';
import Flair from './Flair';
import * as Emojione from 'react-svg-emojione';

class SpectatorPlayer extends Component {
  constructor() {
    super();
    this.win = this.win.bind(this);
    this.emoji = this.emoji.bind(this);
    this.flair = this.flair.bind(this);
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
    } else if (score === null) {
      return <Emojione.sleepy />;
    } else if (score === 0) {
      return <Emojione.expressionless />;
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

  flair(id) {
    // TODO: Fix the booms
    // Because the render for both players if firing this isn't working
    $(`#${id} .boom`).removeClass('boom');
    const { opponent } = this.props;
    if (this.win() === true) {
      return <div>{ sparkles(10, 'sparkles') }</div>;
    // } else if (this.win() === false) {
    //   return <div>{ boom(10, 'boom') }</div>;
    // } else {
    //   return <div>{ boom(opponent / 100, 'boom') }</div>;
    }
  }

  render() {
    const { player, score, name, emoji } = this.props;
    return (
      <div className="face">
        <h1>Player { player } : { name }</h1>
        <div style={ this.style() } className="emoji">
          { this.emoji() }
        </div>
        <h1>
          <NumberEasing
            value={ score || 0 }
            speed={300}
          />
        </h1>
        { this.flair(`player${ player }`) }
      </div>
    );
  }
}

export default SpectatorPlayer;

function sparkles(num, component, unmount) {
  const result = [];
  for (let i = 1; i < num + 1; i++) {
    const delay = i * 100;
    if (i < num / 2 + 1) {
      const x1 = `${ 100 / num * 2 * i - 15}%`;
      const y1 = '20%';
      result.push(<Flair key={ `${x1}${y1}${delay}` } type={ component } x={ x1 } y={ y1 } delay={ delay } />);
    } else if (i > num / 2) {
      const x2 = `${ 100 / num * 2 * (i - num / 2) - 15}%`
      const y2 = '50%';
      result.push(<Flair key={ `${x2}${y2}${delay}` } type={ component } x={ x2 } y={ y2 } delay={ delay } />);
    }
  }
  return result;
}

function boom(num, component) {
  const result = [];
  for (let i = 1; i < num + 1; i++) {
    const delay = i * 100;
    if (i < num / 2 + 1) {
      const x1 = `${Math.floor(Math.random() * 80)}%`;
      const y1 = '20%';
      result.push(<Flair key={ `${x1}${y1}${delay}` } type={ component } x={ x1 } y={ y1 } delay={ delay } />);
    } else if (i > num / 2) {
      const x2 = `${Math.floor(Math.random() * 80)}%`;
      const y2 = '50%';
      result.push(<Flair key={ `${x2}${y2}${delay}` } type={ component } x={ x2 } y={ y2 } delay={ delay } />);
    }
  }
  return result;
}
