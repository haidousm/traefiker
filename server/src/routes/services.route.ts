import express from "express";
import { getAllServicesHandler } from "../controllers/services.controller";

const router = express.Router();

/**
 * @openapi
 * '/services/':
 *  get:
 *     tags:
 *     - Services
 *     summary: Get All Services
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ServiceSchema'
 *      400:
 *        description: Bad request
 */

router.get("/", getAllServicesHandler);

export default router;
