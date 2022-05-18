import { number, object, string, z } from "zod";

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
 *      schemas:
 *          UpdateServiceRequest:
 *              type: object
 *              properties:
 *                  hosts:
 *                      type: array
 *                      items:
 *                          type: string
 *                      required: false
 *                  environmentVariables:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/EnvironmentVariable'
 *                      required: false
 *                  redirects:
 *                      type: array
 *                      items:
 *                          $ref: '#/components/schemas/Redirect'
 *                      required: false
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

/**
 * @openapi
 * components:
 *  schemas:
 *   UpdateServicesOrderRequest:
 *      type: array
 *      items:
 *          type: object
 *          properties:
 *             name:
 *                 type: string
 *             order:
 *                 type: number
 */

export const UpdateServicesOrderRequestSchema = object({
    body: object({
        services: object({
            name: string({
                required_error: "Name is required",
            }),
            order: number({
                required_error: "Order is required",
            }),
        }).array(),
    }),
});

export type UpdateServicesOrderRequest = z.infer<
    typeof UpdateServicesOrderRequestSchema
>;

/**
 * @openapi
 * components:
 *  schemas:
 *   RecreateServiceRequest:
 *      type: object
 *      properties:
 *          image:
 *              type: string
 */
export const RecreateServiceRequestSchema = object({
    body: object({
        image: z.union([
            string({
                required_error: "Image is required",
            }),
            z.undefined(),
        ]),
    }),
});

export type RecreateServiceRequest = z.infer<
    typeof RecreateServiceRequestSchema
>;
