import { Request } from "express";

import database from "../database";
import User from "../entities/User";

export enum Session {
  Inexistant,
  User,
  Admin,
}

export async function getSession(req: Request): Promise<Session> {
  let authorization = req.get("Authorization");

  if (typeof authorization != "string") {
    return Session.Inexistant;
  }

  let full_token = authorization.slice(7);
  let [token, ...email_parts] = full_token.split(':');
  let email = email_parts.join(':')

  let users = database.getRepository(User);

  let user = await users.findOneBy({
    email: email,
  });

  if (user == null) {
    return Session.Inexistant;
  }

  if (user.session_token != token || new Date() > user.session_token_expiration) {
    return Session.Inexistant;
  }

  if (user.admin) {
    return Session.Admin;
  } else {
    return Session.User;
  }
}

export async function isSessionAdmin(req: Request): Promise<boolean> {
  return await getSession(req) == Session.Admin;
}

export async function isSessionConnected(req: Request): Promise<boolean> {
  return await getSession(req) != Session.Inexistant;
}
