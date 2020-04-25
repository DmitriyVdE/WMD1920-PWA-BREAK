var io;

var getIOInstance = () => {
  return io;
};

function sockets(server) {
  io = require("socket.io")(server);

  io.on("connection", (socket) => {
    console.log("New socket connection");

    var room = socket.handshake["query"]["groupcode"];
    socket.join(room);
    console.log("User joined room #" + room);

    socket.on("disconnect", () => {
      socket.leave(room);
      console.log("user disconnected");
    });

    socket.on("blabla", (msg) => {
      io.to(room).emit("blabla", msg);
    });
  });
}

module.exports = {
  sockets,
  getIOInstance,
};
