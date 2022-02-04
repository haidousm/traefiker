import express from "express";
import docker from "../config/docker";
const router = express.Router();

router.get("/pull/:image", async (req, res) => {
    const image = req.params.image.replace(":", "/");
    const stream = await docker.pull(image);
    stream.pipe(res);
});

export default router;
