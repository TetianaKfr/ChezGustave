import fs from "fs/promises";
import crypto from "crypto";
import { Request, Response } from "express";
import mime from "mime-types";

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
    // if (!await isSessionAdmin(req)) {
    //   throw ControllerException.UNAUTHORIZED;
    // }

    const {
      name,
      area,
      description,
      category,
      type,
    } = req.body;

    // Numeric and array fields are collected as string because this request is a multipart request
    // Because multipart requests can receives file uploads.
    // Multipart request only handle string field
    const images_urls_str = req.body.images_urls;
    const low_price_str = req.body.low_price;
    const medium_price_str = req.body.medium_price;
    const high_price_str = req.body.high_price;
    const surface_str = req.body.surface;
    const bathroom_count_str = req.body.bathroom_count;


    if (
      typeof name != "string" ||
      typeof images_urls_str != "string" ||
      typeof area != "string" ||
      typeof description != "string" ||
      typeof low_price_str != "string" ||
      typeof medium_price_str != "string" ||
      typeof high_price_str != "string" ||
      typeof surface_str != "string" ||
      typeof bathroom_count_str != "string" ||
      typeof category != "string" ||
      typeof type != "string"
    ) {
      throw ControllerException.MALFORMED_REQUEST;
    }

    let images_urls = JSON.parse(images_urls_str);
    const low_price = Number.parseFloat(low_price_str);
    const medium_price = Number.parseFloat(medium_price_str);
    const high_price = Number.parseFloat(high_price_str);
    const surface = Number.parseFloat(surface_str);
    const bathroom_count = Number.parseFloat(bathroom_count_str);

    if (
      !Array.isArray(images_urls) ||
      !images_urls.every(image_url => typeof image_url == "string") ||
      Number.isNaN(low_price) ||
      Number.isNaN(medium_price) ||
      Number.isNaN(high_price) ||
      Number.isNaN(surface) ||
      Number.isNaN(bathroom_count)
    ) {
      throw ControllerException.MALFORMED_REQUEST;
    }

    if (req.files != undefined && Array.isArray(req.files)) {
      images_urls = images_urls.concat(req.files.map(file => {
        const file_name = crypto.createHash("sha256").update(file.buffer).digest("hex") + '.' + mime.extension(file.mimetype);
        fs.writeFile("uploads/" + file_name, file.buffer);
        return file_name;
      }));
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
