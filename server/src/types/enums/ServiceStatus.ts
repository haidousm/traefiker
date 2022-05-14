/**
 * @openapi
 * components:
 *  schemas:
 *      ServiceStatus:
 *         type: string
 *         enum:
 *          - PULLING
 *          - CREATED
 *          - RUNNING
 *          - STOPPED
 *          - ERROR
 */
export enum ServiceStatus {
    "PULLING",
    "CREATED",
    "RUNNING",
    "STOPPED",
    "ERROR",
}
