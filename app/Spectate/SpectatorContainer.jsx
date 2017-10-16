import React, { Component } from 'react';
import { TestRunner } from 'code-tester';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import SpectatorView from './SpectatorView';
import WaitingForPlayers from './WaitingForPlayers';

class SpectatorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      player1: {
        id: 0,
        name: 'Liv',
        score: 0,
      }, 
      player2: {
        id: 1,
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

  handlePlayerJoin({ players }) {
    console.log('player joined');
    console.log(players);
    this.setState({ players });
  }

  handleScore(data) {
    console.log('score!');
    console.log(data);
  }

  render() {
    const { players, player1, player2 } = this.state;
    return (
      <div className="text-center">
        { players.length < 2 ?
          <WaitingForPlayers players={players} /> :
          <SpectatorView player1={player1} player2={player2} />
        }
      </div>
    );
  } 
}

export default SpectatorContainer
