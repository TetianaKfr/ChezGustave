import { Request, Response } from 'express';

const ExampleUtils = require('../utils/ExampleUtils');

// The function name should represent it's use case and what it does (get..., create..., get...WithId, ...)
export function getExampleText(req: Request, res: Response) {
    res.send(ExampleUtils.getExample());
}
