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

/**
 * @openapi
 * components:
 *  schemas:
 *   UpdateServiceRequest:
 *      type: object
 *      properties:
 *          hosts:
 *              type: array
 *              items:
 *                 type: string
 *              required: false
 *         environmentVariables:
 *              type: array
 *              items:
 *               $ref: '#/components/schemas/EnvironmentVariable'
 *              required: false
 *         redirects:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/Redirect'
 *              required: false
 */

export const UpdateServiceRequestSchema = object({
    body: object({
        hosts: z.union([
            string({
                required_error: "Hosts are required",
            }).array(),
            z.undefined(),
        ]),
        redirects: z.union([
            object({
                from: string({
                    required_error: "From is required",
                }),
                to: string({
                    required_error: "To is required",
                }),
            }).array(),
            z.undefined(),
        ]),
        environmentVariables: z.union([
            object({
                key: string({
                    required_error: "Key is required",
                }),
                value: string({
                    required_error: "Value is required",
                }),
            }).array(),
            z.undefined(),
        ]),
    }),
});

export type UpdateServiceRequest = z.infer<typeof UpdateServiceRequestSchema>;
