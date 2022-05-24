/**
 * @openapi
 * components:
 *      schemas:
 *          Image:
 *              type: object
 *              properties:
 *                  name:
 *                      type: string
 *                  tag:
 *                      type: string
 *                  repository:
 *                      type: string
 */
export interface Image {
    _id?: string;
    name: string;
    tag: string;
    repository: string;
}
