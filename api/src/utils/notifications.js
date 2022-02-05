const { io } = require("../config/socket");
const streamNotifications = async (route, stream, callback) => {
    stream.on("data", (chunk) => {
        const data = chunk.toString().trim().replace("\r\n", "\n").split("\n");
        data.forEach((line) => {
            const message = JSON.parse(line);
            const notification = {
                route: route,
                message,
            };
            io.sockets.emit("notifications", notification);
        });
    });
    stream.on("end", () => {
        callback();
    });
};

module.exports = streamNotifications;
