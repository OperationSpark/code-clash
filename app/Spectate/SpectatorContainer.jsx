import React, { Component } from 'react';
import { TestRunner } from 'code-tester';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import SpectatorView from './SpectatorView';


class SpectatorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player1: {
        name: 'Liv',
        score: 0,
      }, 
      player2: {
        name: 'Harvey',
        score: 0,
      }
    }; 
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
    const { player1, player2 } = this.state;
    return (
      <div className="text-center">
        Waiting for players to join...
        <SpectatorView player1={player1} player2={player2} />
      </div>
    );
  } 
}

export default SpectatorContainer
