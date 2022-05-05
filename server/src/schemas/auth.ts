import { object, string, z } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *    LoginUserSchema:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          default: username
 *        password:
 *          type: string
 *          default: password
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *        token:
 *          type: string
 *        expires:
 *          type: string
 */

export const loginUserSchema = object({
    body: object({
        username: string({
            required_error: "Username is required",
        }),
        password: string({
            required_error: "Password is required",
        }),
    }),
});

export interface CreateUserSchema {
    username: string;
    password: string;
}
