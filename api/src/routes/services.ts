import express from "express";
import { Service, ServiceModel } from "../models/Service";
const router = express.Router();

router.get("/", async (_req, res) => {
    const services = await Service.find();
    res.json(services);
});

router.post("/", async (req, res) => {
    const serviceRequest: ServiceModel = req.body;
    const service = await Service.create(serviceRequest);
    res.json(service);
});

export default router;
