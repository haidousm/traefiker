/**
 * @openapi
 * components:
 *      schemas:
 *          Image:
 *              type: object
 *              properties:
 *                  id:
 *                     type: string
 *                  name:
 *                      type: string
 *                  tag:
 *                      type: string
 *                  repository:
 *                      type: string
 */
export interface Image {
    id: string;
    name: string;
    tag: string;
    repository: string;
}
