/**
 * @openapi
 * components:
 *  schemas:
 *   Project:
 *      type: object
 *      properties:
 *          id:
 *              type: string
 *          name:
 *              type: string
 */
export interface Project {
    _id?: string;
    name: string;
}
