import { object, string } from "zod";

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
 *          default: moussa
 *        password:
 *          type: string
 *          default: stringPassword123
 *    LoginUserResponse:
 *      type: object
 *      properties:
 *        token:
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
