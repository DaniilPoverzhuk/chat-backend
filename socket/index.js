exports.users = {};

const UserHandler = require("./handlers/user.js");

exports.connect = (io, socket) => {
  UserHandler(io, socket);
};
