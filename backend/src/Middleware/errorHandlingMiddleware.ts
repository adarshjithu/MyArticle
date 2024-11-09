import { NextFunction, Request, Response } from "express";
export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(res.statusCode || 500).json({ message: err.message || "Internal Server Error" });
}
