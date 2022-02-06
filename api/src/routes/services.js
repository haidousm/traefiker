const express = require("express");
const Service = require("../models/Service");

const {
    createContainer,
    startContainer,
    stopContainer,
    deleteContainer,
    getContainerHealth,
    updateContainer,
} = require("../utils/docker");
const { getOrCreateImage, createService } = require("../utils/services");

const router = express.Router();

/**
 * @route GET /services
 * @desc Get all services
 * @access Private
 */

router.get("/", async (_req, res) => {
    const services = await Service.find().populate("image");
    res.json(services);
});

/**
 * @route POST /services/create
 * @desc Create a service
 * @access Private
 */

router.post("/create", async (req, res) => {
    const serviceRequest = req.body;
    const resolvedName = serviceRequest.image;

    const image = await getOrCreateImage(resolvedName);
    if (image === -1) {
        return res.status(400).json({
            message: "Invalid image name",
        });
    }

    const service = await createService(serviceRequest, image);
    await createContainer(service, image);
    res.json(service);
});

/**
 * @route GET /services/:name
 * @desc Get a service
 * @access Private
 * @param {string} name - The name of the service
 */

router.get("/:name", async (req, res) => {
    const name = req.params.name;
    const service = await Service.findOne({
        name,
    });
    if (!service) {
        return res.status(404).json({
            message: "Service not found",
        });
    }
    res.json(service);
});

/**
 * @route PUT /services/:name
 * @desc Update a service
 * @access Private
 * @param {string} name - The name of the service
 */

router.put("/:name", async (req, res) => {
    const name = req.params.name;
    const service = await Service.findOne({
        name,
    }).populate("image");
    if (!service) {
        return res.status(404).json({
            message: "Service not found",
        });
    }

    const updateRequest = req.body;

    const hosts = updateRequest.hosts;
    if (hosts) {
        service.hosts = hosts;
    }

    const image = updateRequest.image;
    if (image) {
        const newImage = await getOrCreateImage(image);
        if (newImage === -1) {
            return res.status(400).json({
                message: "Invalid image name",
            });
        }
        service.image = newImage;
    }

    const redirects = updateRequest.redirects;
    if (redirects) {
        service.redirects = redirects;
    }

    if (hosts || image || redirects) {
        await updateContainer(service, service.image);
        await startContainer(service);
    }

    res.json(service);
});

/**
 * @route PUT /services/start/:name
 * @desc Start a service
 * @access Private
 * @param {string} name - The name of the service
 */

router.put("/start/:name", async (req, res) => {
    const name = req.params.name;
    const service = await Service.findOne({ name });
    if (!service) {
        return res.status(400).json({
            message: "Service not found",
        });
    }
    await startContainer(service);
    res.json(service);
});

/**
 * @route PUT /services/stop/:name
 * @desc Stop a service
 * @access Private
 * @param {string} name - The name of the service
 */

router.put("/stop/:name", async (req, res) => {
    const serviceName = req.params.name;
    const service = await Service.findOne({
        name: serviceName,
    });
    if (!service) {
        return res.status(400).json({
            message: "Service not found",
        });
    }
    await stopContainer(service);

    service.status = "stopped";
    await service.save();
    res.json(service);
});

/**
 * @route DELETE /services/delete/:name
 * @desc Remove a service
 * @access Private
 * @param {string} name - The name of the service
 */

router.put("/delete/:name", async (req, res) => {
    const serviceName = req.params.name;
    const service = await Service.findOne({
        name: serviceName,
    });
    if (!service) {
        return res.status(400).json({
            message: "Service not found",
        });
    }
    await deleteContainer(service);
    await service.remove();
    res.json({
        message: "Service deleted",
    });
});

/**
 * @route GET /services/health/:name
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
    const health = await getContainerHealth(service);
    res.json(health);
});

module.exports = router;
