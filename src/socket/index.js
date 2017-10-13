const { processScore } = require('../helpers/game.js');

module.exports = function socketHandler(io) {
  const players = [];
  const game = io.of('/game');
  game.on('connect', function (socket) {
    socket.join('gameRoom');
    console.log('connected  !!');
    console.log('socket ID', socket.id);
    console.log('socket rooms', socket.rooms);

    socket.on('game', handleGame.bind(null, socket));
    socket.on('score update', broadcastScore.bind(null, socket));
    socket.on('spectator join', sendPlayers.bind(null, socket, players));
  });
  
  game.on('disconnect', (socket) => {
    console.log('disconnected', socket.id);
  });

  const handleGame = (socket, { message, playerId }) => {
    console.log('handling game');
    addPlayer(players, playerId);
    sendPlayers(socket, players);
  };

  const broadcastScore = (socket, { playerId, score }) => {
    console.log('broacasting score');
    socket.to('gameRoom').emit('score update', { playerId, score: processScore(score) });
  };

  const sendPlayers = (socket, players) => {
    console.log('sending players');
    io.sockets.in('gameRoom').emit('player join', { players });
  };

};

function addPlayer(players, newPlayer) {
  !players.includes(newPlayer) && players.push(newPlayer);
}

