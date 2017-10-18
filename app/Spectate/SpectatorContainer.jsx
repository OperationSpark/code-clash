import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import faker from 'faker';
import SpectatorView from './SpectatorView';
import WaitingForPlayers from './WaitingForPlayers';

class SpectatorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
    }; 
    this.handleScore = this.handleScore.bind(this);
    this.handlePlayerJoin = this.handlePlayerJoin.bind(this);
    this.initializePlayer = this.initializePlayer.bind(this);
  }

  componentDidMount() {
    this.joinRoom();
  }
  
  joinRoom() {
    this.gameIO = io('/game');
    this.gameIO.emit('spectator join');
    this.gameIO.on('score update', this.handleScore);
    this.gameIO.on('player join', this.handlePlayerJoin);
  }

  handlePlayerJoin({ players }) {
    this.setState({ players: _.map(players, this.initializePlayer ) });
  }

  handleScore(player) {
    this.setState(({ players }) => ({
      players: _.map(players, (p) =>
        p.id === player.id ? Object.assign(p, { score: player.score }) : p )
      }
    ));
  }

  initializePlayer(player) {
    return _.defaults(player, { score: 0, name: faker.name.firstName() })
  }

  render() {
    const { players } = this.state;
    return (
      <div className="text-center">
        { players.length < 2 ?
          <WaitingForPlayers players={players} /> :
          <SpectatorView player1={players[0]} player2={players[1]} />
        }
      </div>
    );
  } 
}

export default SpectatorContainer
