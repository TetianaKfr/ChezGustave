import { NextFunction, Request, Response } from 'express';

export function ExampleMiddleware(req: Request, res: Response, next: NextFunction) {
    console.log('Example log');
    next();
}
