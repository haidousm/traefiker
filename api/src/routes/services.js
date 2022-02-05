const express = require("express");
const { Service } = require("../models/Service");
const router = express.Router();

router.get("/", async (_req, res) => {
    const services = await Service.find();
    res.json(services);
});

router.post("/", async (req, res) => {
    const serviceRequest = req.body;
    const fullImageName = serviceRequest.image;

    const regex = /^(.+)\/(.+):(.+)|(.+):(.+)$/;
    const match = regex.exec(fullImageName);
    if (!match) {
        return res.status(400).json({
            error: "Invalid image name",
        });
    }

    const repository = match[1];
    const image = match[2] ?? match[4];
    const tag = match[3] ?? match[5];

    // const service = await Service.create(serviceRequest);
    res.json({ repository, image, tag });
});

module.exports = router;
