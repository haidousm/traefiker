import express from "express";
import validateResource from "../middleware/validateResource";
import { CreateServiceRequestSchema } from "../schemas/services.schema";
import {
    createServiceHandler,
    getAllServicesHandler,
} from "../controllers/services.controller";

const router = express.Router();

/**
 * @openapi
 * '/services':
 *  get:
 *      tags:
 *          - Services
 *      summary: Returns all services
 *      security:
 *         - bearerAuth: []
 *      responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Service'
 *          401:
 *              description: Unauthorized
 */
router.get("/", getAllServicesHandler);

/**
 * @openapi
 * '/services/create':
 *      post:
 *          tags:
 *              - Services
 *          summary: Create a new service
 *          security:
 *              - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/CreateServiceRequest'
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Service'
 *              401:
 *                  description: Unauthorized
 */
router.post(
    "/create",
    validateResource(CreateServiceRequestSchema),
    createServiceHandler
);

export default router;
