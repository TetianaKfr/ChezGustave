import { Request, Response } from "express";
import { DeepPartial, QueryFailedError } from "typeorm";
import bcrypt from "bcrypt";

import database from "../database";
import User from "../entities/User";
import { Session, getSession } from "../utils/Session";
import ControllerException from "../utils/ControllerException";

export async function list(_req: Request, res: Response) {
  // TODO: Securise this so only admin can request this

  let users = database.getRepository(User);

  let emails = (await users.find({ select: ["email"] })).map((user) => user.email);

  res.status(200).send(emails);
}

export async function create(req: Request, res: Response) {
  try {
    if (await getSession(req) != Session.Admin) {
      throw new ControllerException(401);
    }

    const {
      first_name,
      last_name,
      email,
      password,
      phone_number,
      admin,
    } = req.body;

    if (
      typeof first_name != "string" ||
      typeof last_name != "string" ||
      typeof email != "string" ||
      typeof password != "string" ||
      typeof phone_number != "string" ||
      typeof admin != "boolean"
    ) {
      throw new ControllerException(400);
    }

    const user: DeepPartial<User> = {
      first_name,
      last_name,
      email,
      password_hash: await bcrypt.hash(password, 12),
      phone_number,
      admin,
    };

    try {
      await database.getRepository(User).save(user);
    } catch (e) {
      if (e instanceof QueryFailedError && e.driverError.code == "23505") {
        throw new ControllerException(409);
      }
      throw e;
    }

    res.sendStatus(201);
  } catch (e) {
    if (e instanceof ControllerException) {
      e.send(res);
    } else {
      console.error("Uncatched server error: " + e);
      res.sendStatus(500);
    }
  }
}
