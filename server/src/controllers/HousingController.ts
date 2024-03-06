import { Request, Response } from "express";

import ControllerException, { handle_controller_errors } from "../utils/ControllerException";
import database from "../database";
import Housing from "../entities/Housing";
import { isSessionAdmin, isSessionConnected } from "../utils/Session";

export async function list(req: Request, res: Response) {
  try {
    if (!await isSessionConnected(req)) {
      throw ControllerException.UNAUTHORIZED;
    }

    let housings_names = (await database.getRepository(Housing).find(
      { select: { name: true } }
    )).map(housing => housing.name);

    res.status(200).send(housings_names);
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
      name,
      images_urls,
      area,
      description,
      low_price,
      medium_price,
      high_price,
      surface,
      bathroom_count,
      category,
      type,
    } = req.body;

    if (
      typeof name != "string" ||
      !Array.isArray(images_urls) || // Vérification que images_urls est un tableau
      !images_urls.every(url => typeof url === "string") || // Vérification que toutes les valeurs dans le tableau images_urls sont des chaînes de caractères
      typeof area != "string" ||
      typeof description != "string" ||
      typeof low_price != "number" ||
      typeof medium_price != "number" ||
      typeof high_price != "number" ||
      typeof surface != "number" ||
      typeof bathroom_count != "number" ||
      typeof category != "string" ||
      typeof type != "string"
    ) {
      throw ControllerException.MALFORMED_REQUEST;
    }

    await database.getRepository(Housing).save({
      name,
      images_urls,
      area,
      description,
      low_price,
      medium_price,
      high_price,
      surface,
      bathroom_count,
      category,
      type,
    });

    res.sendStatus(201);
  } catch (err) {
    handle_controller_errors(res, err);
  }
}

export async function remove(req: Request, res: Response) {
  try {
    if (!await isSessionAdmin(req)) {
      throw ControllerException.UNAUTHORIZED;
    }

    let name: string = req.params.name;

    const result = await database.getRepository(Housing).delete({ name: name });
    if (result.affected == null || result.affected < 1) {
      throw ControllerException.NOT_FOUND;
    }

    res.sendStatus(200);
  } catch (err) {
    return handle_controller_errors(res, err);
  }
};

export async function modify(req: Request, res: Response) {
  try {
    if (!await isSessionAdmin(req)) {
      throw ControllerException.UNAUTHORIZED;
    }

    const {
      name,
      images_urls,
      area,
      description,
      low_price,
      medium_price,
      high_price,
      surface,
      bathroom_count,
      category,
      type,
    } = req.body;

    if (
      typeof name != "string" ||
      !Array.isArray(images_urls) ||
      !images_urls.every(url => typeof url === "string") ||
      typeof area != "string" ||
      typeof description != "string" ||
      typeof low_price != "number" ||
      typeof medium_price != "number" ||
      typeof high_price != "number" ||
      typeof surface != "number" ||
      typeof bathroom_count != "number" ||
      typeof category != "string" ||
      typeof type != "string"
    ) {
      throw ControllerException.MALFORMED_REQUEST;
    }

    const housing = {
      name,
      images_urls,
      area,
      description,
      low_price,
      medium_price,
      high_price,
      surface,
      bathroom_count,
      category,
      type,
    };

    await database.getRepository(Housing).update({ name: req.params.name }, housing);

    res.sendStatus(200);
  } catch (err) {
    return handle_controller_errors(res, err);
  }
}


export async function get(req: Request, res: Response) {
  try {
    const housing = await database.getRepository(Housing).findOne({
      select: {
        name: true,
        images_urls: true,
        area: true,
        description: true,
        low_price: true,
        medium_price: true,
        high_price: true,
        surface: true,
        bathroom_count: true,
        category: true,
        type: true,
      },
      where: {
        name: req.params.name
      }
    });

    res.status(200).send(housing);
  } catch (err) {
    handle_controller_errors(res, err);
  }
}
