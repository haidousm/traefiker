import express from "express";
import validateResource from "../middleware/validateResource";
import { CreateServiceRequestSchema } from "../schemas/services.schema";
import {
    createServiceHandler,
    getAllServicesHandler,
    startServiceHandler,
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

/**
 * @openapi
 * '/services/{name}/start':
 *      put:
 *          tags:
 *              - Services
 *          summary: Start a service
 *          security:
 *             - bearerAuth: []
 *          parameters:
 *             - name: name
 *               in: path
 *               required: true
 *               description: Service name
 *          responses:
 *              200:
 *                  description: Success
 *                  content:
 *                    application/json:
 *                       schema:
 *                          $ref: '#/components/schemas/Service'
 *              401:
 *                  description: Unauthorized
 *              404:
 *                  description: Not Found
 *
 */

router.put("/:name/start", startServiceHandler);

export default router;
