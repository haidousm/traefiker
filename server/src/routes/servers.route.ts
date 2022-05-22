import express from "express";
import { getAllServersHandler } from "../controllers/servers.controller";
const router = express.Router();

/**
 * @openapi
 * '/servers':
 *  get:
 *     tags:
 *     - Servers
 *     summary: Returns all servers
 *     responses:
 *          200:
 *              description: Success
 *              content:
 *                  application/json:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Server'
 *          400:
 *              description: Bad request
 *          401:
 *              description: Unauthorized
 */

router.get("/", getAllServersHandler);
