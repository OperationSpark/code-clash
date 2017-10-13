import React, { Component } from 'react';
import { TestRunner } from 'code-tester';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

class SpectatorContainer extends Component {
  constructor(props) {
    super(props);
    this.handleScore = this.handleScore.bind(this);
    this.handlePlayerJoin = this.handlePlayerJoin.bind(this);
  }

  componentDidMount() {
    this.joinRoom();
  }
  
  joinRoom() {
    this.gameIO = io('/game');
    this.gameIO.on('connection', (socket) => {
      socket.join('gameRoom', () => {
        let rooms = Objects.keys(socket.rooms);
        console.log(rooms); // [ <socket.id>, 'room 237' ]
        io.to('gameRoom', 'a new user has joined the room'); // broadcast to everyone in the room
      });
    });
    this.gameIO.emit('spectator join');
    this.gameIO.on('score update', this.handleScore);
    this.gameIO.on('player join', this.handlePlayerJoin);
  }

  handlePlayerJoin(data) {
    console.log('player joined');
    console.log(data);
  }

  handleScore(data) {
    console.log('score!');
    console.log(data);
  }

  render() {
    return (
      <div className="text-center">
        Waiting for players to join...
      </div>
    );
  } 
}

export default SpectatorContainer
