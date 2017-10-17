import React, { Component } from 'react';
import Flair from './Spectate/Flair';
import * as Emojione from 'react-svg-emojione';
import Floater from './helpers/Floater'

class SplashPageAnimation extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="scene row">
        {<Floater />}
        <div className="col-sm-6">
          <div className="emoji">
            <Emojione.smirk />
          </div>
        </div>
        <div className="right-head col-sm-6">
          <div className="emoji">
            <Emojione.smirk />
          </div>
        </div>
      </div>
    );
  }
}

export default SplashPageAnimation;
