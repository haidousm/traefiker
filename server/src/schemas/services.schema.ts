import { object, string } from "zod";
import { ImageResponse } from "./images.schema";

/**
 * @openapi
 * components:
 *  schemas:
 *   EnvironmentVariable:
 *      type: object
 *      properties:
 *          key:
 *              type: string
 *          value:
 *              type: string
 */
export interface EnvironmentVariable {
    key: string;
    value: string;
}

/**
 * @openapi
 * components:
 *  schemas:
 *   Redirect:
 *      type: object
 *      properties:
 *          from:
 *              type: string
 *          to:
 *              type: string
 */
export interface Redirect {
    from: string;
    to: string;
}

/**
 * @openapi
 * components:
 *  schemas:
 *   Service:
 *      type: object
 *      properties:
 *          name:
 *              type: string
 *          status:
 *              type: string
 *          image:
 *              $ref: '#/components/schemas/Image'
 *          network:
 *              type: string
 *          hosts:
 *              type: array
 *              items:
 *                 type: string
 *          redirects:
 *              type: array
 *              items:
 *                 $ref: '#/components/schemas/Redirect'
 *          environments:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/EnvironmentVariable'
 *          order:
 *              type: integer
 *          createdAt:
 *              type: string
 *          containerId:
 *              type: string
 *          tag:
 *             type: string
 */
export interface ServiceResponse {
    name: string;
    status: string;
    image: ImageResponse;
    network: string;
    hosts: string[];
    redirects: Redirect[];
    environments: EnvironmentVariable[];
    order: number;
    createdAt: Date;
    containerId: string;
    tag: string;
}

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

export interface CreateServiceRequest {
    name: string;
    image: string;
    hosts: string[];
}