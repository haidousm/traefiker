import { Types } from "mongoose";
import { ServiceStatus } from "./enums/ServiceStatus";
import { EnvironmentVariable } from "./EnvironmentVariable";
import { Image } from "./Image";
import { Project } from "./Project";
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
 *          project:
 *             $ref: '#/components/schemas/Project'
 *          order:
 *              type: integer
 */

export interface Service {
    _id?: string;
    name: string;
    status: ServiceStatus;
    image: Image;
    hosts: string[];
    environmentVariables: EnvironmentVariable[];
    redirects: Redirect[];
    project: Project;
    order: number;
    dockerInfo?: {
        network?: string;
        containerId?: string;
        containerName?: string;
    };
}
