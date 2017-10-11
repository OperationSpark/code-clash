import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from './Header.jsx';
import Main from './Main.jsx';

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
