import express from "express";
import {
    createServiceHandler,
    getAllServicesHandler,
} from "../controllers/services.controller";

const router = express.Router();

/**
 * @openapi
 * '/services':
 *  get:
 *     tags:
 *     - Services
 *     summary: Get All Services
 *     security:
 *      - bearerAuth: []
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Service'
 *      401:
 *          description: Unauthorized
 */
router.get("/", getAllServicesHandler);

/**
 * @openapi
 * '/services/create':
 *  post:
 *      tags:
 *          - Services
 *      summary: Create a new service
 *      security:
 *         - bearerAuth: []
 *      requestBody:
 *          required: true
 *          content:
 *             application/json:
 *               schema:
 *                 $ref: '#/components/schemas/CreateServiceRequest'
 *      responses:
 *         200:
 *            description: Success
 *           content:
 *             application/json:
 *               schema:
 *                $ref: '#/components/schemas/Service'
 *        401:
 *           description: Unauthorized
 */
router.post("/create", createServiceHandler);

export default router;
