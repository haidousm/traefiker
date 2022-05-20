import express from "express";
import {
    addServiceToProjectHandler,
    getAllProjectsHandler,
    getAllServicesForProjectHandler,
} from "../controllers/projects.controller";

const router = express.Router();

/**
 * @openapi
 * '/projects':
 *  get:
 *     tags:
 *     - Projects
 *     summary: Returns all projects
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Project'
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */

router.get("/", getAllProjectsHandler);

/**
 * @openapi
 * '/projects/{projectName}/services':
 *  get:
 *     tags:
 *     - Projects
 *     summary: Returns all services for a project
 *     parameters:
 *     - name: projectName
 *       in: path
 *       required: true
 *       description: Project name
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Service'
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */

router.get("/:projectName/services", getAllServicesForProjectHandler);

/**
 * @openapi
 * '/projects/{projectName}/{serviceName}':
 *  put:
 *     tags:
 *     - Projects
 *     summary: Adds service to project (to delete service from proj. add it to default)
 *     parameters:
 *     - name: projectName
 *       in: path
 *       required: true
 *       description: Project name
 *     - name: serviceName
 *       in: path
 *       required: true
 *       description: Service name
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Service'
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */

router.put("/:projectName/:serviceName", addServiceToProjectHandler);

export default router;
