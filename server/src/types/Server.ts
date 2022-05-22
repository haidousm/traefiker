/**
 * @openapi
 * components:
 *  schemas:
 *   Server:
 *      type: object
 *      properties:
 *          id:
 *              type: string
 *          name:
 *              type: string
 *          host:
 *              type: string
 *          port:
 *              type: number
 */
export interface Server {
    id: string;
    name: string;
    host: string;
    port: number;
}
