const express = require("express");
const { Service } = require("../models/Service");
const router = express.Router();

router.get("/", async (_req, res) => {
    const services = await Service.find();
    res.json(services);
});

router.post("/", async (req, res) => {
    const serviceRequest = req.body;
    const service = await Service.create(serviceRequest);
    res.json(service);
});

module.exports = router;
