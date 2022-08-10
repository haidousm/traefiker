// import express from "express";
// import {
//     deleteProjectHandler,
//     getProjectHandler,
//     updateProjectHandler,
// } from "../controllers/projects.controller";
// import {
//     addServiceToProjectHandler,
//     createProjectHandler,
//     getAllProjectsHandler,
//     getAllServicesForProjectHandler,
// } from "../controllers/projects.controller";

// const router = express.Router();

// /**
//  * @openapi
//  * '/projects':
//  *  get:
//  *     tags:
//  *     - Projects
//  *     summary: Returns all projects
//  *     responses:
//  *          200:
//  *              description: Success
//  *              content:
//  *                  application/json:
//  *                      type: array
//  *                      items:
//  *                          $ref: '#/components/schemas/Project'
//  *          400:
//  *              description: Bad request
//  *          401:
//  *              description: Unauthorized
//  */

// router.get("/", getAllProjectsHandler);

// /**
//  * @openapi
//  * '/projects/{projectName}':
//  *      get:
//  *          tags:
//  *              - Projects
//  *          summary: get a project
//  *          security:
//  *              - bearerAuth: []
//  *          parameters:
//  *              - name: projectName
//  *                in: path
//  *                required: true
//  *                description: Project name
//  *          responses:
//  *              200:
//  *                  description: Success
//  *                  content:
//  *                      application/json:
//  *                          schema:
//  *                              $ref: '#/components/schemas/Project'
//  *              401:
//  *                  description: Unauthorized
//  */

// router.get("/:projectName", getProjectHandler);

// /**
//  * @openapi
//  * '/projects/{projectName}':
//  *      post:
//  *          tags:
//  *              - Projects
//  *          summary: Create a project
//  *          security:
//  *              - bearerAuth: []
//  *          parameters:
//  *              - name: projectName
//  *                in: path
//  *                required: true
//  *                description: Project name
//  *          responses:
//  *              200:
//  *                  description: Success
//  *                  content:
//  *                      application/json:
//  *                          schema:
//  *                              $ref: '#/components/schemas/Project'
//  *              401:
//  *                  description: Unauthorized
//  */

// router.post("/:projectName", createProjectHandler);

// /**
//  * @openapi
//  * '/projects/{projectName}':
//  *      put:
//  *          tags:
//  *              - Projects
//  *          summary: update project name
//  *          security:
//  *              - bearerAuth: []
//  *          parameters:
//  *              - name: projectName
//  *                in: path
//  *                required: true
//  *                description: Project name
//  *          requestBody:
//  *              required: true
//  *              content:
//  *                  application/json:
//  *                      schema:
//  *                          name:
//  *                              type: string
//  *          responses:
//  *              200:
//  *                  description: Success
//  *                  content:
//  *                      application/json:
//  *                          schema:
//  *                              $ref: '#/components/schemas/Project'
//  *              401:
//  *                  description: Unauthorized
//  */

// router.put("/:projectName", updateProjectHandler);

// /**
//  * @openapi
//  * '/projects/{projectName}':
//  *      delete:
//  *          tags:
//  *              - Projects
//  *          summary: Delete a project
//  *          security:
//  *              - bearerAuth: []
//  *          parameters:
//  *              - name: projectName
//  *                in: path
//  *                required: true
//  *                description: Project name
//  *          responses:
//  *              200:
//  *                  description: Success
//  *                  content:
//  *                      application/json:
//  *                          schema:
//  *                              $ref: '#/components/schemas/Project'
//  *              401:
//  *                  description: Unauthorized
//  */

// router.delete("/:projectName", deleteProjectHandler);

// /**
//  * @openapi
//  * '/projects/{projectName}/services':
//  *  get:
//  *     tags:
//  *     - Projects
//  *     summary: Returns all services for a project
//  *     parameters:
//  *     - name: projectName
//  *       in: path
//  *       required: true
//  *       description: Project name
//  *     responses:
//  *          200:
//  *              description: Success
//  *              content:
//  *                  application/json:
//  *                      type: array
//  *                      items:
//  *                          $ref: '#/components/schemas/Service'
//  *          400:
//  *              description: Bad request
//  *          401:
//  *              description: Unauthorized
//  */

// router.get("/:projectName/services", getAllServicesForProjectHandler);

// /**
//  * @openapi
//  * '/projects/{projectName}/services/{serviceName}':
//  *  put:
//  *     tags:
//  *     - Projects
//  *     summary: Adds service to project (to delete service from proj. add it to default)
//  *     parameters:
//  *     - name: projectName
//  *       in: path
//  *       required: true
//  *       description: Project name
//  *     - name: serviceName
//  *       in: path
//  *       required: true
//  *       description: Service name
//  *     responses:
//  *          200:
//  *              description: Success
//  *              content:
//  *                  application/json:
//  *                      type: array
//  *                      items:
//  *                          $ref: '#/components/schemas/Service'
//  *          400:
//  *              description: Bad request
//  *          401:
//  *              description: Unauthorized
//  */

// router.put("/:projectName/services/:serviceName", addServiceToProjectHandler);

// export default router;
