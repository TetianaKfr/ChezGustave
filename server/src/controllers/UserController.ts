import { Request, Response } from "express";
import bcrypt from "bcrypt";

import database from "../database";
import User from "../entities/User";
import { isSessionAdmin, isSessionConnected, sessionEmail } from "../utils/Session";
import ControllerException, { handle_controller_errors } from "../utils/ControllerException";

export async function list(req: Request, res: Response) {
  try {
    if (!await isSessionAdmin(req)) {
      throw ControllerException.UNAUTHORIZED;
    }

    const emails =
      (await database.getRepository(User).find({ select: ["email"] }))
        .map((user) => user.email);

    res.status(200).send(emails);
  } catch (err) {
    handle_controller_errors(res, err);
  }
}

export async function create(req: Request, res: Response) {
  try {
    if (!await isSessionAdmin(req)) {
      throw ControllerException.UNAUTHORIZED;
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
      throw ControllerException.MALFORMED_REQUEST;
    }

    await database.getRepository(User).save({
      first_name,
      last_name,
      email,
      password_hash: await bcrypt.hash(password, 12),
      phone_number,
      admin,
    });

    res.sendStatus(201);
  } catch (err) {
    handle_controller_errors(res, err);
  }
}

export async function authenticate(req: Request, res: Response) {
  try {
    const {
      email,
      password,
    } = req.body;

    if (
      typeof email != "string" ||
      typeof password != "string"
    ) {
      throw ControllerException.MALFORMED_REQUEST;
    }

    const users = database.getRepository(User);

    const user = await users.findOne({ where: { email }, select: { id: true, password_hash: true } });
    if (user == null) {
      throw ControllerException.UNAUTHORIZED;
    }

    if (!await bcrypt.compare(password, user.password_hash)) {
      throw ControllerException.UNAUTHORIZED;
    }

    const token = Buffer.from(crypto.getRandomValues(new Uint8Array(128))).toString("base64");

    let expiration = new Date();
    expiration.setDate(new Date().getDate() + 30);

    await users.update({ id: user.id }, {
      session_token: token,
      session_token_expiration: expiration,
    });

    res.status(200).send({ token: token + ":" + email });
  } catch (err) {
    handle_controller_errors(res, err);
  }
}

export async function remove(req: Request, res: Response) {
  try {
    if (!await isSessionAdmin(req)) {
      throw ControllerException.UNAUTHORIZED;
    }

    const { email } = req.body;

    if (typeof email != "string") {
      throw ControllerException.MALFORMED_REQUEST;
    }

    const result = await database.getRepository(User).delete({ email: email });
    if (result.affected == null || result.affected < 1) {
      throw ControllerException.NOT_FOUND;
    }

    res.sendStatus(200);
  } catch (err) {
    return handle_controller_errors(res, err);
  }
}

export async function modify(req: Request, res: Response) {
  try {
    if (!await isSessionAdmin(req)) {
      throw ControllerException.UNAUTHORIZED;
    }

    const {
      email,
      first_name,
      last_name,
      new_email,
      password,
      phone_number,
      admin,
    } = req.body;

    if (
      typeof email != "string" ||
      (typeof first_name != "string" && first_name != undefined) ||
      (typeof last_name != "string" && last_name != undefined) ||
      (typeof new_email != "string" && new_email != undefined) ||
      (typeof password != "string" && password != undefined) ||
      (typeof phone_number != "string" && phone_number != undefined) ||
      (typeof admin != "boolean" && admin != undefined)
    ) {
      throw ControllerException.MALFORMED_REQUEST;
    }

    await database.getRepository(User).update({ email }, {
      first_name,
      last_name,
      email: new_email,
      password_hash: await bcrypt.hash(password, 12),
      phone_number,
      admin,
    });

    res.sendStatus(200);
  } catch (err) {
    return handle_controller_errors(res, err);
  }
}

export async function get(req: Request, res: Response) {
  try {
    const { email } = req.body;

    if (typeof email != "string") {
      throw ControllerException.MALFORMED_REQUEST;
    }

    if (!await isSessionConnected(req) || (email != sessionEmail(req) && !await isSessionAdmin(req))) {
      throw ControllerException.UNAUTHORIZED;
    }

    const user = await database.getRepository(User).findOne({
      relations: { bookings: true },
      where: { email },
    });

    if (user == null) {
      throw ControllerException.NOT_FOUND;
    }

    res.status(200).send({
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      admin: user.admin,
      bookings: user.bookings.map(booking => booking.id),
    });
  } catch (err) {
    handle_controller_errors(res, err);
  }
}
