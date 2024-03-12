import { Request, Response } from "express";
import bcrypt from "bcrypt";
import nodemailer from "nodemailer";

import database from "../database";
import User from "../entities/User";
import { isSessionAdmin, isSessionConnected, sessionEmail } from "../utils/Session";
import ControllerException, { handle_controller_errors } from "../utils/ControllerException";
import Cooptation from "../entities/Cooptation";

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

const email_transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "louislecam25@gmail.com",
    pass: "yxxr buld uwgi yoch"
  },
});

export async function coopt(req: Request, res: Response) {
  try {
    if (!await isSessionConnected(req)) {
      throw ControllerException.UNAUTHORIZED;
    }

    const session_email = sessionEmail(req);
    if (session_email == null) {
      throw ControllerException.UNAUTHORIZED;
    }

    const {
      first_name,
      last_name,
      email,
      phone_number,
      comment,
    } = req.body;

    if (
      typeof first_name != "string" ||
      typeof last_name != "string" ||
      typeof email != "string" ||
      typeof phone_number != "string" ||
      typeof comment != "string"
    ) {
      throw ControllerException.MALFORMED_REQUEST;
    }

    const user = await database.getRepository(User).findOneBy({ email: session_email });
    if (user == null) {
      throw ControllerException.UNAUTHORIZED;
    }

    const token = Buffer.from(crypto.getRandomValues(new Uint8Array(128))).toString("base64url");

    const cooptations = database.getRepository(Cooptation);

    await cooptations.insert({
      token,
      first_name,
      last_name,
      email,
      phone_number,
    });

    const cooptation = await cooptations.findOneBy({ email });
    if (cooptation == null) {
      throw ControllerException.NOT_FOUND;
    }

    await email_transporter.sendMail({
      from: "louislecam25@gmail.com",
      to: email,
      subject: "Cooptage Chez Gustave",
      html: `
        <main style="font-family: "Montserrat", sans-serif;font-style: normal;margin:12px;background:#ddd;border-radius:12px;padding:12px;margin:auto;max-width:40em;">
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet">

          <h1 style="font-size: 1.5em;margin-top: 0.5em;margin-bottom: 1em;margin-left:1em;">
            Demande de cooptage
          </h1>
          <h2 style="font-size: 1em;margin-top: 4px;margin-bottom: 4px;">
            De ${first_name} ${last_name} (${email}, ${phone_number})
          </h2>
          <h2 style="font-size: 1em;margin-top: 4px;margin-bottom: 4px;">
            Par ${user.first_name} ${user.last_name} (${user.first_name}, ${user.phone_number})
          </h2>
          <p>${comment}</p>
          <a
            href="https://${req.hostname}:${process.env.PORT}/users/coopt/accept/${cooptation.id}/${token}"
            style="display:inline-block;text-decoration:none;color:black;padding:8px;font-size:1.1em;padding:8px;border:none;background:#5edbc0;"
          >
            Accepter la demande
          </a>
          <a
            href="https://${req.hostname}:${process.env.PORT}/users/coopt/deny/${cooptation.id}/${token}"
            style="display:inline-block;text-decoration:none;color:black;padding:8px;font-size:1.1em;padding:8px;border:none;background:#ed766d;"
          >
            Refuser la demande
          </a>
        </main>
      </body>
      `,
    });

    res.sendStatus(200);
  } catch (err) {
    handle_controller_errors(res, err);
  }
}

export async function acceptCooptation(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const token = req.params.token;

    const cooptation = await database.getRepository(Cooptation).findOneBy({ id, token });
    if (cooptation == null) {
      throw new ControllerException(404, "Le demande de cooptation n'existe pas, elle à peut-être déjà été accepté ou refusé");
    }

    const password = Buffer.from(crypto.getRandomValues(new Uint8Array(32))).toString("base64");

    await database.getRepository(User).insert({
      first_name: cooptation.first_name,
      last_name: cooptation.last_name,
      password_hash: await bcrypt.hash(password, 12),
      email: cooptation.email,
      phone_number: cooptation.phone_number,
      admin: false,
      bookings: []
    });

    email_transporter.sendMail({
      from: "louislecam25@gmail.com",
      to: cooptation.email,
      subject: "Cooptage Chez Gustave",
      text: "Vous avez été cooptez pour accéder au catalogue de Chez Gustave, " +
        "les professionels du paradis de riche, " +
        "partez enfin en vacances loin de pauvres qui font tant peur\n\n" +
        "Mot de passe: " + password
    });

    res.status(200).send("Demande de cooptation accepté avec succès");
  } catch (err) {
    handle_controller_errors(res, err);
  }
}

export async function denyCooptation(req: Request, res: Response) {
  try {
    const id = Number.parseInt(req.params.id);
    const token = req.params.token;

    const result = await database.getRepository(Cooptation).delete({ id, token });
    if (result.affected == null || result.affected < 1) {
      throw new ControllerException(404, "Le demande de cooptation n'existe pas, elle à peut-être déjà été accepté ou refusé");
    }

    res.status(200).send("Demande de cooptation refusé avec succès");
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
    if (!await isSessionAdmin(req)) {
      throw ControllerException.UNAUTHORIZED;
    }

    const { email } = req.body;

    if (typeof email != "string") {
      throw ControllerException.MALFORMED_REQUEST;
    }

    const user = await database.getRepository(User).findOne({
      select: {
        first_name: true,
        last_name: true,
        email: true,
        phone_number: true,
        admin: true
      },
      where: { email },
    });

    if (user == null) {
      throw ControllerException.NOT_FOUND;
    }

    res.status(200).send(user);
  } catch (err) {
    handle_controller_errors(res, err);
  }
}
