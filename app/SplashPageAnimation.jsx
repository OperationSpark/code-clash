import React, { Component } from 'react';
import Flair from './Spectate/Flair';
import * as Emojione from 'react-svg-emojione';

class SplashPageAnimation extends Component {
  constructor() {
    super();
  }

  render() {
    const { player, score, name, emoji } = this.props;
    return (
      <div className="scene row">
        <div className="emoji col-sm-6">
          <Emojione.smirk />
        </div>
        <div className="emoji right-head col-sm-6">
          <Emojione.smirk />
        </div>
      </div>
    );
  }
}

export default SplashPageAnimation;
