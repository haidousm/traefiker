import express from "express";
import { getAllServicesForProjectHandler } from "../controllers/projects.controller";

const router = express.Router();

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

export default router;