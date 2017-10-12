module.exports = function socketHandler(io) {
  io.on('connect', function (socket) {
    socket.emit('news', { hello: 'world' });
    
    socket.on('game', handleGame);
  });
};

const handleGame = (data) => {
  console.log(data);
};
