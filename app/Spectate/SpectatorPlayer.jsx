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

  flair(id) {
    $('.boom').removeClass('boom');
    const { opponent } = this.props;
    if (this.win() === true) {
      return <div className="flair-container">
        { sparkles(10, 'sparkles', this.handleChildUnmount) }
      </div>;
    } else if (this.win() === false) {
      return <div className="flair-container">
        { boom(10, 'boom', this.handleChildUnmount) }
      </div>;
    } else if (opponent === 0) {
      return <div className="flair-container">
      </div>;
    } else if (opponent < 200) {
      return <div className="flair-container">
        { boom(1, 'boom', this.handleChildUnmount) }
      </div>;
    } else if (opponent < 400) {
      return <div className="flair-container">
        { boom(2, 'boom', this.handleChildUnmount) }
      </div>;
    } else if (opponent < 600) {
      return <div className="flair-container">
        { boom(4, 'boom', this.handleChildUnmount) }
      </div>;
    } else if (opponent < 800) {
      return <div className="flair-container">
        { boom(6, 'boom', this.handleChildUnmount) }
      </div>;
    } else if (opponent < 1000) {
      return <div className="flair-container">
        { boom(8, 'boom', this.handleChildUnmount) }
      </div>;
    }
  }

  render() {
    const { player, score, name, emoji } = this.props;
    return (
      <div className="col-md-6" id={ `player${ player + 1 }` }>
        <div className="face">
          <h1>Player { player + 1 } : { name }</h1>
          <div style={ this.style() } className="emoji">
            { this.emoji() }
          </div>
          <h1>
            <NumberEasing
              value={ score }
              speed={300}
            />
          </h1>
        </div>
        { this.flair(`player${ player + 1 }`) }
      </div>
    );
  }
}

export default SpectatorPlayer;

function sparkles(num, component, unmount) {
  var result = [];
  for (var i = 1; i < num + 1; i++) {
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

function boom(num, component, unmount) {
  var result = [];
  for (var i = 1; i < num + 1; i++) {
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
