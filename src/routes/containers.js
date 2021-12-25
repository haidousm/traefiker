const express = require("express");
const router = express.Router();

const YAML = require("yaml");
const fs = require("fs");
const {
    createDockerFile,
    getDataFromFile,
    getHostsFromService,
    createService,
    addHostToExistingLabels,
    transformHostsToLabels,
} = require("../utils");

/**
 * @route GET /containers
 * @desc Get all containers
 * @access Public
 */
router.get("/", (req, res) => {
    res.send(getAllContainers());
});

/**
 * @route GET /containers/:name
 * @desc Get container by name
 * @access Public
 */
router.get("/:name", (req, res) => {
    const container = getContainerByName(req.params.name);
    if (container) {
        return res.send(container);
    }
    res.status(404).send({
        error: `Container with name ${req.params.name} not found`,
    });
});

/**
 * @route POST /containers
 * @desc Create a container
 * @access Public
 */
router.post("/", (req, res) => {
    const { name, image, hosts } = req.body;
    if (!fs.existsSync(process.env.DOCKER_FILEPATH)) {
        createDockerFile(process.env.DOCKER_FILEPATH);
    }
    const data = getDataFromFile(process.env.DOCKER_FILEPATH);
    const service = createService(name, image);
    service.labels = [
        ...service.labels,
        ...transformHostsToLabels(name, hosts),
    ];

    data.services[name] = service;
    fs.writeFileSync(process.env.DOCKER_FILEPATH, YAML.stringify(data));
    res.send(data);
});

/**
 * @route POST /containers/host
 * @desc Add a host to a container
 * @access Public
 */
router.post("/host", (req, res) => {
    const { name, host } = req.body;
    const data = getDataFromFile(process.env.DOCKER_FILEPATH, YAML);
    const service = data.services[name];

    service.labels = addHostToExistingLabels(name, service, host);

    data.services[name] = service;
    fs.writeFileSync(process.env.DOCKER_FILEPATH, YAML.stringify(data));
    res.send(data);
});

/**
 * @route DELETE /containers/:name
 * @desc Delete a container
 * @access Public
 */
router.delete("/:name", (req, res) => {
    const data = getDataFromFile(process.env.DOCKER_FILEPATH, YAML);
    delete data.services[req.params.name];
    fs.writeFileSync(process.env.DOCKER_FILEPATH, YAML.stringify(data));
    res.send(data);
});

const getAllContainers = () => {
    if (!fs.existsSync(process.env.DOCKER_FILEPATH)) {
        createDockerFile(process.env.DOCKER_FILEPATH);
    }
    const data = getDataFromFile(process.env.DOCKER_FILEPATH);
    const serviceNames = Object.keys(data.services);
    const containers = serviceNames.map((name) => {
        const service = data.services[name];
        return {
            name,
            image: service.image,
            hosts: getHostsFromService(service),
        };
    });
    return containers;
};

const getContainerByName = (name) => {
    if (!fs.existsSync(process.env.DOCKER_FILEPATH)) {
        createDockerFile(process.env.DOCKER_FILEPATH);
    }
    const data = getDataFromFile(process.env.DOCKER_FILEPATH);
    const service = data.services[name];
    return {
        name,
        image: service.image,
        hosts: getHostsFromService(service),
    };
};

module.exports = { router, getAllContainers };
