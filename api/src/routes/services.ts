import express from "express";
import { Service } from "../models/Service";
const router = express.Router();

router.get("/", async (_req, res) => {
    const services = await Service.find();
    res.json(services);
});

export default router;
