import { NextFunction, Request, Response } from "express";
import { z } from "zod";

function validate<T extends z.ZodTypeAny>(schema: T) {
    return async function(req: Request, res: Response, next: NextFunction) {
        console.log(req.body)
        try {
            await schema.parseAsync(req.body);
            return next();
        } catch (error) {
            return res.status(400).json(error);
        }
    }
}

export {validate}