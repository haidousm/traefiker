import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

const validate =
    (schema: AnyZodObject) =>
    (req: Request, res: Response, next: NextFunction) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params,
            });
            next();
        } catch (e) {
            /* istanbul ignore else */
            if (e instanceof Error) {
                res.status(400).send(e.message);
            } else {
                res.status(400).send(e);
            }
        }
    };

export default validate;
