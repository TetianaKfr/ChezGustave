import { Request, Response } from "express";
import { DeepPartial, QueryFailedError, getRepository  } from "typeorm";
import bcrypt from "bcrypt";

import database from "../database";
import User from "../entities/User";
import { isSessionAdmin } from "../utils/Session";
import ControllerException, { handle_controller_errors } from "../utils/ControllerException";

export async function list(req: Request, res: Response) {
  try {
    if (!await isSessionAdmin(req)) {
      throw ControllerException.UNAUTHORIZED;
    }

    let users = database.getRepository(User);

    let emails = (await users.find({ select: ["email"] })).map((user) => user.email);

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
        throw ControllerException.CONFLICT;
      }

      throw e;
    }

    res.sendStatus(201);
  } catch (err) {
    handle_controller_errors(res, err);
  }
}

export async function authentificate(req: Request, res: Response) {
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

    let users = database.getRepository(User);

    const users_result = await users.find({ where: { email }, select: ["id", "password_hash"] });
    if (users_result[0] == undefined) {
      throw ControllerException.UNAUTHORIZED;
    }
    const { id, password_hash } = users_result[0];

    if (password_hash == undefined || !await bcrypt.compare(password, password_hash)) {
      throw ControllerException.UNAUTHORIZED;
    }

    const token = Buffer.from(crypto.getRandomValues(new Uint8Array(128))).toString("base64");

    let expiration = new Date();
    expiration.setDate(new Date().getDate() + 30);

    const user: DeepPartial<User> = {
      session_token: token,
      session_token_expiration: expiration,
    }

    await users.update({ id }, user);

    res.status(200).send({ token: token + ":" + email });
  } catch (err) {
    handle_controller_errors(res, err);
  }
}

export async function deleteUser(req: Request, res: Response) {
  let email: string = req.params.email;

  try {
    // Récupérer le référentiel d'utilisateur
    const userRepository = database.getRepository(User);

    // Rechercher l'utilisateur dans la base de données.
    const user = await userRepository.findOne({ where: { email: email } });

    // Vérifier si l'utilisateur existe.
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Supprimer l'utilisateur de la base de données.
    await userRepository.remove(user);

    return res.status(200).json({ message: 'Utilisateur supprimé avec succès' });
  } catch (error) {
    // Gérer les erreurs de suppression.
    return res.status(500).json({ message: 'Erreur lors de la suppression de l\'utilisateur' });
  }
}

export async function updateUser(req: Request, res: Response) {
  const email = req.params.email;
  const { first_name, last_name, password_hash, phone_number, admin }: DeepPartial<User> & { password: string }  = req.body;

  try {
    // Récupérer le référentiel d'utilisateur
    const userRepository = database.getRepository(User);

    // Rechercher l'utilisateur dans la base de données.
    let user = await userRepository.findOne({ where: { email: email } });

    // Vérifier si l'utilisateur existe.
    if (!user) {
      return res.status(404).json({ message: 'Utilisateur non trouvé' });
    }

    // Mettre à jour les propriétés de l'utilisateur si elles sont fournies.
    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (email) user.email = email;
    if (password_hash) {
      // Valider le nouveau mot de passe
      if (!isValidPassword(password_hash)) {
        return res.status(400).json({ message: 'Le mot de passe doit contenir au moins 8 caractères' });
      }
      // Hacher et enregistrer le nouveau mot de passe
      user.password_hash = await bcrypt.hash(password_hash, 12);
    }
    if (phone_number) user.phone_number = phone_number;
    if (admin !== undefined) user.admin = admin;

    // Enregistrer les modifications dans la base de données.
    await userRepository.save(user);

    return res.status(200).json({ message: 'Utilisateur mis à jour avec succès' });
  } catch (error) {
    // Gérer les erreurs de mise à jour.
    return res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'utilisateur' });
  }
}

// Fonction de validation du mot de passe
function isValidPassword(password_hash: string): boolean {
  // Ajoutez vos règles de validation du mot de passe ici
  return password_hash.length >= 12;
}