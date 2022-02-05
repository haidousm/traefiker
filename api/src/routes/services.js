const express = require("express");
const Service = require("../models/Service");
const Image = require("../models/Image");

const { docker, launchService } = require("../utils/docker");

const router = express.Router();

/**
 * @route GET /api/services
 * @desc Get all services
 * @access Private
 */

router.get("/", async (_req, res) => {
    const services = await Service.find();
    res.json(services);
});

/**
 * @route POST /api/services/create
 * @desc Create a service
 * @access Private
 */

router.post("/create", async (req, res) => {
    const serviceRequest = req.body;
    const fullImageName = serviceRequest.image;

    const image = await getOrCreateImage(fullImageName);
    if (image === -1) {
        return res.status(400).json({
            message: "Invalid image name",
        });
    }

    const service = await createService(serviceRequest, image);

    await launchService(service, fullImageName);
    res.json(service);
});

/**
 * @route GET /api/services/start
 * @desc Start a service
 * @access Private
 * @param {string} name - The name of the service
 */

router.get("/start/:name", async (req, res) => {
    const name = req.params.name;
    const service = await Service.findOne({ name });
    if (!service) {
        return res.status(400).json({
            message: "Service not found",
        });
    }
    const container = docker.getContainer(service.dockerId);
    await container.start();
    res.json(service);
});

/**
 * @route GET /api/services/stop/:name
 * @desc Stop a service
 * @access Private
 * @param {string} name - The name of the service
 */

router.get("/stop/:name", async (req, res) => {
    const serviceName = req.params.name;
    const service = await Service.findOne({
        name: serviceName,
    });
    if (!service) {
        return res.status(400).json({
            message: "Service not found",
        });
    }
    const container = docker.getContainer(service.dockerId);
    await container.stop();
    res.json(service);
});

/**
 * @route GET /api/services/rm/:name
 * @desc Remove a service
 * @access Private
 * @param {string} name - The name of the service
 */

router.get("/rm/:name", async (req, res) => {
    const serviceName = req.params.name;
    const service = await Service.findOne({
        name: serviceName,
    });
    if (!service) {
        return res.status(400).json({
            message: "Service not found",
        });
    }
    const container = docker.getContainer(service.dockerId);
    await container.remove();
    await Service.deleteOne({
        name: serviceName,
    });
    res.json(service);
});

/**
 * @route GET /api/services/health/:name
 * @desc Get the health of a service
 * @access Private
 * @param {string} name - The name of the service
 */

router.get("/health/:name", async (req, res) => {
    const serviceName = req.params.name;
    const service = await Service.findOne({
        name: serviceName,
    });
    if (!service) {
        return res.status(400).json({
            message: "Service not found",
        });
    }
    const container = docker.getContainer(service.dockerId);
    const health = (await container.inspect()).State;
    res.json(health);
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

const createService = async (serviceRequest, image) => {
    const service = new Service({
        name: serviceRequest.name,
        status: "created",
        image: image._id,
        hosts: serviceRequest.hosts,
        order: serviceRequest.order,
        tag: `traefiker_${serviceRequest.name}`,
    });

    const oldService = await Service.findOne({
        name: service.name,
    });

    if (oldService) {
        if (oldService.dockerId) {
            const container = docker.getContainer(oldService.dockerId);
            await container.stop();
            await container.remove();
        } else {
            await oldService.remove();
        }
    }
    await service.save();
    return service;
};

module.exports = router;
