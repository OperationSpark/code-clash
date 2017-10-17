import React, { Component } from 'react';
import * as Emojione from 'react-svg-emojione';

class Floater extends Component {
  constructor() {
    super();
    this.char = this.char.bind(this);
    this.chars = this.chars.bind(this);
    this.style = this.style.bind(this);
    this.append = this.append.bind(this);
  }

  chars() {
    return [
      '<div>',
      '{}',
      '[]',
      'console.log',
      '!==',
      'class',
      'function',
      'const',
      'let',
      '_.reduce',
    ];
  }

  componentDidMount() {
    setInterval(this.append, 300);
  }

  char() {
    const index = Math.floor(Math.random() * this.chars().length);
    return this.chars()[index];
  };

  style() {
    return {
      top: `${Math.floor(Math.random() * 20)}%`,
      left: `${Math.floor(Math.random() * 90)}%`,
      color: color(),
    };
  }

  append() {
    console.log('Appending');
    const floater = $('.floater');
    const children = floater.length;
    if (children > 50) {
      floater.remove();
      console.log(floater);
    }
    const $h4 = $('<h2>')
      .addClass('floater', `floater${Math.floor(Math.random() * 2)}`)
      .css(this.style())
      .text(this.char())
      .appendTo('#floaters');
  };

  render() {
    return (
      <div id="floaters"></div>
    );
  }
}

export default Floater;

function color() {
  return Math.floor(Math.random() * 2) ? '#0d0' : '#d00';
}