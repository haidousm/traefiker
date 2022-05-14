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
