import React, { Component } from 'react';

class Bang extends Component {
  constructor() {
    super();
    this.style = this.style.bind(this);
  }

  style() {
    return {
      top: Math.floor((window.innerHeight * .4 - 100) * Math.random()),
      left: Math.floor((window.innerWidth * .5 - 100) * Math.random()),
      'animationDelay': Math.floor(Math.random() * 1000) + 'ms', 
    }
  }; 

  render() {
    return (
      <i 
      style={ this.style() }
      className="em em-collision"
      ></i>
    );
  }
}

export default Bang;
