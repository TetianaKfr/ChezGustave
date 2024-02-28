import { Request, Response } from "express";
import { QueryFailedError } from "typeorm";

import ControllerException, { handle_controller_errors } from "../utils/ControllerException";
import database from "../database";
import Equipment from "../entities/Equipment";

export async function create(req: Request, res: Response) {
  try {
    const { name } = req.body;

    if (typeof name != "string") {
      throw new ControllerException(400);
    }

    try {
      await database.getRepository(Equipment).save({ name });
    } catch (err) {
      if (err instanceof QueryFailedError && err.driverError.code == "23505") {
        throw new ControllerException(409);
      }

      throw err;
    }

    res.sendStatus(201);
  } catch (err) {
    handle_controller_errors(res, err);
  }
}

