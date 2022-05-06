import mongoose from "mongoose";

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

export interface ServiceDocument extends mongoose.Document {
    name: string;
    status: Enumerator<string>;
    image: mongoose.Schema.Types.ObjectId;
    network: string;
    hosts: string[];
    redirects: Redirect[];
    environments: EnvironmentVariable[];
    order: number;
    createdAt: Date;
    containerId: string;
    tag: string;
    getServiceLabels(): string[];
    getEnvironments(): string[];
}
