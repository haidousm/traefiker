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
 *                  identifier:
 *                      type: string
 *                  createdAt:
 *                      type: date
 */
export interface ImageResponse {
    name: string;
    tag: string;
    repository: string;
    identifier: string;
    createdAt: Date;
}
