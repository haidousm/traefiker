import { object, string, z } from "zod";

/**
 * @openapi
 * components:
 *  schemas:
 *   CreateServiceRequest:
 *      type: object
 *      properties:
 *          name:
 *              type: string
 *          image:
 *              type: string
 *          hosts:
 *              type: array
 *              items:
 *                 type: string
 */

export const CreateServiceRequestSchema = object({
    body: object({
        name: string({
            required_error: "Name is required",
        }),
        image: string({
            required_error: "Image is required",
        }),
        hosts: string({
            required_error: "Hosts are required",
        }).array(),
    }),
});

export type CreateServiceRequest = z.infer<typeof CreateServiceRequestSchema>;
