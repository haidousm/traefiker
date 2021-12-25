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
    res.send(containers);
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
    const service = createService(image);
    service.labels = transformHostsToLabels(name, hosts);

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

module.exports = router;
