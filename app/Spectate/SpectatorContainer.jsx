import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import faker from 'faker';
import SpectatorView from './SpectatorView';
import WaitingForPlayers from './WaitingForPlayers';
import { getPublicCodeQuiz } from '../helpers';


class SpectatorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      testSpec: '',
    }; 
    this.handleScore = this.handleScore.bind(this);
    this.handlePlayerJoin = this.handlePlayerJoin.bind(this);
    this.handlePlayerInput = this.handlePlayerInput.bind(this);
    this.initializePlayer = this.initializePlayer.bind(this);
    this.getQuiz = this.getQuiz.bind(this);
  }

  componentDidMount() {
    this.joinRoom();
  }
  
  updatePlayer(newPlayer) {
    return (oldPlayer) => oldPlayer.id === newPlayer.id ? Object.assign(oldPlayer, newPlayer) : oldPlayer;
  }

  joinRoom() {
    this.gameIO = io('/game');
    this.gameIO.emit('spectator join');
    this.gameIO.on('score update', this.handleScore);
    this.gameIO.on('player join', this.handlePlayerJoin);
    this.gameIO.on('player input', this.handlePlayerInput);
    this.gameIO.on('quiz url', this.getQuiz);
  }

  getQuiz(url) {
    this.setState({ loading: true });
    getPublicCodeQuiz(url)
      .then(data => {
        this.setState({
          testSpec: data.spec.data,
          loading: false,
          error: null,
        });
      })
      .catch((err) => {
        console.error(err);
        this.setState({
          testSpec: '',
          loading: false,
          error: err,
        });
      });
  }

  handlePlayerJoin({ players }) {
    this.setState({ players: _.map(players, this.initializePlayer ) });
  }

  handleScore({ id, score, passCount, failCount }) {
    this.setState(({ players }) => ({
      players: _.map(players, this.updatePlayer({ id, score, passCount, failCount })),
    }));
  }

  handlePlayerInput({ id, randomCode }) {
    this.setState(({ players }) => ({
      players: _.map(players, this.updatePlayer({ id, randomCode })),
    }));
  }

  initializePlayer(player) {
    return _.defaults(player, { score: 0, name: faker.name.firstName() })
  }

  render() {
    const { players, testSpec } = this.state;
    console.log(players.map(p => p.randomCode));
    return (
      <div className="text-center">
        { players.length < 2 ?
          <WaitingForPlayers players={players} /> :
          <SpectatorView player1={players[0]} player2={players[1]} testSpec={testSpec} />
        }
      </div>
    );
  } 
}

export default SpectatorContainer
