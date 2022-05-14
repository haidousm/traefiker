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
