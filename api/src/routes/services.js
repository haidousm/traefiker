const express = require("express");
const Service = require("../models/Service");
const Image = require("../models/Image");
const docker = require("../config/docker");
const streamNotifications = require("../utils/notifications");
const router = express.Router();

router.get("/", async (_req, res) => {
    const services = await Service.find();
    res.json(services);
});

router.post("/", async (req, res) => {
    const serviceRequest = req.body;
    const fullImageName = serviceRequest.image;

    const image = await getOrCreateImage(req, res, fullImageName);
    if (image === -1) {
        return res.status(400).json({
            message: "Invalid image name",
        });
    }

    const service = new Service({
        name: serviceRequest.name,
        status: "created",
        image: image._id,
        hosts: serviceRequest.hosts,
        order: serviceRequest.order,
    });
    await service.save();

    res.json(service);
});

const getOrCreateImage = async (fullImageName) => {
    const regex = /^(.+)\/(.+):(.+)$|^(.+):(.+)$|^(.+)/;
    const match = regex.exec(fullImageName);
    if (!match) {
        return -1;
    }

    const repository = match[1] ?? "_";
    const imageName = match[2] ?? match[4] ?? match[6];
    const tag = match[3] ?? match[5] ?? "latest";

    let image = await Image.findOne({
        repository,
        name: imageName,
        tag,
    });

    if (!image) {
        image = new Image({
            repository,
            name: imageName,
            tag,
        });
        await image.save();
    }

    return image;
};

module.exports = router;
