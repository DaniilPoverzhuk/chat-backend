const users = require("../index.js");

module.exports = (io, socket) => {
  const getOnlineUsers = () => {
    io.emit("user:get-online", users);
  };

  socket.on("user:get-online", getOnlineUsers);
};
