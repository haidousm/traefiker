import { ServiceStatus } from "./enums/ServiceStatus";
import { EnvironmentVariable } from "./EnvironmentVariable";
import { Image } from "./Image";
import { Redirect } from "./Redirect";

/**
 * @openapi
 * components:
 *  schemas:
 *   Service:
 *      type: object
 *      properties:
 *          id:
 *             type: string
 *          name:
 *              type: string
 *          status:
 *              $ref: '#/components/schemas/ServiceStatus'
 *          image:
 *              $ref: '#/components/schemas/Image'
 *          network:
 *              type: string
 *          hosts:
 *              type: array
 *              items:
 *                 type: string
 *          environmentVariables:
 *              type: array
 *              items:
 *                  $ref: '#/components/schemas/EnvironmentVariable'
 *          redirects:
 *              type: array
 *              items:
 *                 $ref: '#/components/schemas/Redirect'
 *          containerId:
 *              type: string
 *          internalName:
 *             type: string
 *          order:
 *              type: integer
 */
export interface Service {
    id: string;
    name: string;
    status: ServiceStatus;
    image: Image;
    hosts: string[];
    environmentVariables: EnvironmentVariable[];
    redirects: Redirect[];
    network: string;
    containerId: string;
    internalName: string;
    order: number;
}
