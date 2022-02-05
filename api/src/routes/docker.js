const express = require("express");
const docker = require("../config/docker");
const { io } = require("../config/socket");
const router = express.Router();

router.get("/pull/:image", async (req, res) => {
    const image = req.params.image.replace(":", "/");
    const stream = await docker.pull(image);
    stream.on("data", (chunk) => {
        const data = chunk.toString().trim().replace("\r\n", "\n").split("\n");
        data.forEach((line) => {
            const message = JSON.parse(line);
            const notification = {
                route: "/docker/pull",
                message,
            };
            io.sockets.emit("notification", notification);
        });
    });
    res.status(200).send();
});

module.exports = router;
