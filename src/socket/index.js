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
    console.log('socket rooms', socket.rooms);

    // socket.on('game', handleGame.bind(null, socket));
    socket.on('score update', broadcastScore.bind(null, socket));
    socket.on('spectator join', sendPlayers.bind(null, socket, players));
    socket.on('player join', handleGame.bind(null, socket));
  });
  
  game.on('disconnect', (socket) => {
    console.log('disconnected', socket.id);
  });

  const handleGame = (socket,  player ) => {
    console.log('handling game');
    addPlayer(players, player);
    sendPlayers(socket, players);
  };

  const broadcastScore = (socket, { id: playerId, score }) => {
    console.log('broacasting score');
    socket.to('gameRoom').emit('score update', { playerId, score: processScore(score) });
  };

  const sendPlayers = (socket, players) => {
    console.log('sending players');
    socket.to('gameRoom').emit('player join', { players });
  };

};

function addPlayer(players, newPlayer) {
  !_.some(players, player => _.includes(player, newPlayer.id)) && players.push(newPlayer);
}

