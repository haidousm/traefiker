import express from "express";
import validateResource from "../middleware/validateResource";
import {
    RecreateServiceRequestSchema,
    UpdateServicesOrderRequestSchema,
} from "../schemas/services.schema";
import {
    CreateServiceRequestSchema,
    UpdateServiceRequestSchema,
} from "../schemas/services.schema";
import {
    createServiceHandler,
    deleteServiceHandler,
    getAllServicesHandler,
    recreateServiceHandler,
    startServiceHandler,
    stopServiceHandler,
    updateServiceHandler,
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
 * '/services/{name}/update':
 *      put:
 *          tags:
 *              - Services
 *          summary: Update service's hosts, environment variables, redirects
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *             - name: name
 *               in: path
 *               required: true
 *               description: Service name
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateServiceRequest'
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
router.put(
    "/:name/update",
    validateResource(UpdateServiceRequestSchema),
    updateServiceHandler
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

/**
 * @openapi
 * '/services/{name}/stop':
 *      put:
 *          tags:
 *              - Services
 *          summary: Stop a service
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
router.put("/:name/stop", stopServiceHandler);

/**
 * @openapi
 * '/services/{name}/delete':
 *      delete:
 *          tags:
 *              - Services
 *          summary: Delete a service
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
 *              401:
 *                  description: Unauthorized
 *              404:
 *                  description: Not Found
 *
 */
router.delete("/:name/delete", deleteServiceHandler);

/**
 * @openapi
 * '/services/{name}/recreate':
 *      put:
 *          tags:
 *              - Services
 *          summary: Recreate a service (useful for repulling images)
 *          security:
 *              - bearerAuth: []
 *          parameters:
 *             - name: name
 *               in: path
 *               required: true
 *               description: Service name
 *          requestBody:
 *              required: false
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/RecreateServiceRequest'
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
router.put(
    "/:name/recreate",
    validateResource(RecreateServiceRequestSchema),
    recreateServiceHandler
);

/**
 * @openapi
 * '/services/order':
 *      put:
 *          tags:
 *              - Services
 *          summary: Updates the ordering of all services
 *          security:
 *             - bearerAuth: []
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/UpdateServicesOrderRequest'
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized
 *
 */
// router.put(
//     "/order",
//     validateResource(UpdateServicesOrderRequestSchema),
//     updateServicesOrderHandler
// );

export default router;
