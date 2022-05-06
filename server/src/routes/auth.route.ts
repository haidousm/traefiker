import express from "express";
import { loginUserHandler } from "../controllers/auth.controller";
import validateResource from "../middleware/validateResource";
import { LoginUserRequestSchema } from "../schemas/auth.schema";

const router = express.Router();

/**
 * @openapi
 * '/auth/login':
 *  post:
 *     tags:
 *     - Auth
 *     summary: Login
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/LoginUserSchema'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/LoginUserResponse'
 *      400:
 *        description: Bad request
 */

router.post(
    "/login",
    validateResource(LoginUserRequestSchema),
    loginUserHandler
);

export default router;
