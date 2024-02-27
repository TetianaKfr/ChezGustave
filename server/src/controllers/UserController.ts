import { Request, Response } from "express";

import database from "../database";
import User from "../entities/User";

export async function list(_req: Request, res: Response) {
  // TODO: Securise this so only admin can request this

  let users = database.getRepository(User);

  let emails = (await users.find({ select: ["email"] })).map((user) => user.email);

  res.status(200).send(emails);
}
