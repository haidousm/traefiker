const { Server } = require("socket.io");
const io = new Server();
module.exports = { io };
