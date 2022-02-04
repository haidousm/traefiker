const express = require("express");
const docker = require("../config/docker");
const router = express.Router();

router.get("/pull/:image", async (req, res) => {
    const image = req.params.image.replace(":", "/");
    const stream = await docker.pull(image);
    stream.pipe(res);
});

module.exports = router;
