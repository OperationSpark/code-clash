import React, { Component } from 'react';
import * as Emojione from 'react-svg-emojione';

class Flair extends Component {
  constructor() {
    super();
    this.style = this.style.bind(this);
    this.type = this.type.bind(this);
  }

  style(x, y, delay) {
    return {
      left: x,
      top: y,
      animationDelay: `${delay}ms`,
    }
  };

  type(emoji) {
    return React.createElement(Emojione[emoji], {});
  };

  render() {
    const { x, y, delay, type } = this.props;
    return (
      <div 
        style={ this.style(x, y, delay) } 
        className={ type + ' flair' }
      >
        { this.type(type) }
      </div>
    );
  }
}

export default Flair;
