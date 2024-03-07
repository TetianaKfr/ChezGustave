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

    let housings = (await database.getRepository(Housing).find({
      select: { name: true }
    }));

    res.status(200).send(housings.map(housing => housing.name));
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
      area,
      description,
      category,
      type,
    } = req.body;

    // Numeric and array fields are collected as string because this request is a multipart request
    // Because multipart requests can receives file uploads.
    // Multipart request only handle string field
    let images_urls = JSON.parse(req.body.images_urls);
    const low_price = Number.parseFloat(req.body.low_price);
    const medium_price = Number.parseFloat(req.body.medium_price);
    const high_price = Number.parseFloat(req.body.high_price);
    const surface = Number.parseFloat(req.body.surface);
    const bathroom_count = Number.parseFloat(req.body.bathroom_count);

    if (
      typeof name != "string" ||
      !Array.isArray(images_urls) ||
      !images_urls.every(image_url => typeof image_url == "string") ||
      typeof area != "string" ||
      typeof description != "string" ||
      Number.isNaN(low_price) ||
      Number.isNaN(medium_price) ||
      Number.isNaN(high_price) ||
      Number.isNaN(surface) ||
      Number.isNaN(bathroom_count) ||
      typeof category != "string" ||
      typeof type != "string"
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

    const { name } = req.body;

    if (typeof name != "string") {
      throw ControllerException.MALFORMED_REQUEST;
    }

    const result = await database.getRepository(Housing).delete({ name });
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
      new_name,
      area,
      description,
      category,
      type,
    } = req.body;

    // Numeric and array fields are collected as string because this request is a multipart request
    // Because multipart requests can receives file uploads.
    // Multipart request only handle string field
    let images_urls = JSON.parse(req.body.images_urls);
    const low_price = Number.parseFloat(req.body.low_price);
    const medium_price = Number.parseFloat(req.body.medium_price);
    const high_price = Number.parseFloat(req.body.high_price);
    const surface = Number.parseFloat(req.body.surface);
    const bathroom_count = Number.parseFloat(req.body.bathroom_count);

    if (
      typeof name != "string" ||
      (typeof new_name != "string" && new_name != undefined) ||
      (images_urls != undefined && !(
        Array.isArray(images_urls) &&
        images_urls.every(url => typeof url === "string")
      )) ||
      (typeof area != "string" && area != undefined) ||
      (typeof description != "string" && description != undefined) ||
      (typeof low_price != "number" && low_price != undefined) ||
      Number.isNaN(medium_price) ||
      Number.isNaN(high_price) ||
      Number.isNaN(surface) ||
      Number.isNaN(bathroom_count) ||
      (typeof category != "string" && category != undefined) ||
      (typeof type != "string" && type != undefined)
    ) {
      throw ControllerException.MALFORMED_REQUEST;
    }

    if (req.files != undefined && Array.isArray(req.files)) {
      const uploaded_images_name = req.files.map(file => {
        const file_name = crypto.createHash("sha256").update(file.buffer).digest("hex") + '.' + mime.extension(file.mimetype);
        fs.writeFile("uploads/" + file_name, file.buffer);
        return file_name;
      });

      if (images_urls == undefined) {
        images_urls = uploaded_images_name;
      } else {
        images_urls = images_urls.concat(uploaded_images_name);
      }
    }

    await database.getRepository(Housing).update({ name }, {
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

    res.sendStatus(200);
  } catch (err) {
    return handle_controller_errors(res, err);
  }
}

export async function get(req: Request, res: Response) {
  try {
    if (!await isSessionConnected(req)) {
      throw ControllerException.UNAUTHORIZED;
    }

    const { name } = req.body;

    if (typeof name != "string") {
      throw ControllerException.MALFORMED_REQUEST;
    }

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
      where: { name }
    });

    if (housing == null) {
      throw ControllerException.NOT_FOUND;
    }

    res.status(200).send(housing);
  } catch (err) {
    handle_controller_errors(res, err);
  }
}
