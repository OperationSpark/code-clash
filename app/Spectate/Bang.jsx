import React, { Component } from 'react';
import * as Emojione from 'react-svg-emojione';

class Bang extends Component {
  constructor() {
    super();
    this.style = this.style.bind(this);
  }

  style() {
    return {
      top: Math.floor((window.innerHeight * .4 - 100) * Math.random()),
      left: Math.floor((window.innerWidth * .5 - 100) * Math.random()),
      'animationDelay': Math.floor(Math.random() * 500) + 'ms', 
    }
  }; 

  render() {
    return (
      <div 
        style={ this.style() } 
        className="sparkle"
      >
        <Emojione.sparkles />
      </div>
      // <i 
      // style={ this.style() }
      // className="em em-collision"
      // ></i>
    );
  }
}

export default Bang;
