/* eslint no-console: warn */
const _ = require('lodash');
const { processScore } = require('../helpers/game.js');

module.exports = function socketHandler(io) {
  const players = [];
  const game = io.of('/game');
  game.on('connect', function (socket) {
    socket.join('gameRoom');
    console.log('connected  !!');
    console.log('socket ID', socket.id);
    console.log('players', players);

    // socket.on('game', handleGame.bind(null, socket));
    socket.on('score update', broadcastScore.bind(null, socket));
    socket.on('spectator join', sendPlayers.bind(null, socket, players));
    socket.on('player join', handleGame.bind(null, socket));
    socket.on('player input', broadcastPlayerCode.bind(null, socket));
  });
  
  game.on('disconnect', (socket) => {
    console.log('disconnected', socket.id);
  });

  const handleGame = (socket,  player ) => {
    console.log('handling game');
    addPlayer(players, player);
    sendPlayers(socket, players);
  };

  const broadcastScore = (socket, { id, score }) => {
    console.log('broacasting score');
    socket.to('gameRoom').emit('score update', { id, score: processScore(score) });
  };

  const broadcastPlayerCode = (socket, { id, randomCode }) => {
    console.log('broadcasting code', randomCode);
    socket.to('gameRoom').emit('player input', { id, randomCode });
  };

  const sendPlayers = (socket, players) => {
    console.log('sending players');
    socket.to('gameRoom').emit('player join', { players });
  };

};

function addPlayer(players, newPlayer) {
  !_.some(players, player => _.includes(player, newPlayer.id)) && players.push(newPlayer);
}

