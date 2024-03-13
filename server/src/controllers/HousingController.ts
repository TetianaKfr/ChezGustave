import fs from "fs/promises";
import crypto from "crypto";
import { Request, Response } from "express";
import mime from "mime-types";

import ControllerException, { handle_controller_errors } from "../utils/ControllerException";
import database from "../database";
import Housing from "../entities/Housing";
import { isSessionAdmin, isSessionConnected } from "../utils/Session";
import { And, Any, Between, FindOperator, LessThan, MoreThan, Not } from "typeorm";
import Booking from "../entities/Booking";

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

export async function search(req: Request, res: Response) {
  try {
    if (!await isSessionConnected(req)) {
      throw ControllerException.UNAUTHORIZED;
    }

    function assertIsArrayOfString(obj: any): string[] {
      if (!Array.isArray(obj) || !obj.every((filter: any) => typeof filter == "string")) {
        throw ControllerException.MALFORMED_REQUEST;
      }

      return obj;
    }

    function getFilter(obj: any): FindOperator<string> | undefined {
      if (obj == undefined) {
        return undefined;
      }

      if (obj.with != undefined) {
        if (obj.without != undefined) {
          return And(Any(assertIsArrayOfString(obj.with)), Not(Any(assertIsArrayOfString(obj.without))));
        } else {
          return Any(assertIsArrayOfString(obj.with));
        }
      } else {
        if (obj.without != undefined) {
          return Not(Any(assertIsArrayOfString(obj.without)));
        } else {
          return undefined;
        }
      }
    }

    const {
      categories,
      types,
      price_range_start,
      price_range_end,
    } = req.body;

    const date_start_str = req.body.date_start;
    const date_end_str = req.body.date_end;

    if (
      (price_range_start != undefined && typeof price_range_start != "number") ||
      (price_range_end != undefined && typeof price_range_end != "number") ||
      (date_start_str != undefined && typeof date_start_str != "string") ||
      (date_end_str != undefined && typeof date_end_str != "string")
    ) {
      throw ControllerException.MALFORMED_REQUEST;
    }

    let date_start: Date | undefined = new Date(date_start_str);
    let date_end: Date | undefined = new Date(date_end_str);

    if (Number.isNaN(date_start.valueOf())) {
      date_start = undefined;
    }
    if (Number.isNaN(date_end.valueOf())) {
      date_end = undefined;
    }

    let price_filter: FindOperator<number> | undefined;
    if (price_range_start != undefined) {
      if (price_range_end != undefined) {
        price_filter = Between(price_range_start, price_range_end);
      } else {
        price_filter = MoreThan(price_range_start);
      }
    } else {
      if (price_range_end != undefined) {
        price_filter = LessThan(price_range_end);
      } else {
        price_filter = undefined;
      }
    }

    const housings_names = (await database.getRepository(Housing).find({
      select: { name: true },
      where: {
        category: getFilter(categories),
        type: getFilter(types),
        medium_price: price_filter,
      }
    })).map(housing => housing.name);

    const bookings = await database.getRepository(Booking).find({
      relations: { housing: true },
      select: { start: true, end: true, housing: { name: true } },
      where: {
        housing: { name: Any(housings_names) }
      },
    });

    housings_names.filter(housing_name => {
      return !bookings
        .filter(booking => booking.housing.name = housing_name)
        .some(booking => {
          (date_end == undefined || booking.start <= date_end) &&
            (date_start == undefined || booking.end >= date_start)
        });
    });

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
      area,
      description,
      category,
      type,
      chef,
    } = req.body;

    // Numeric and array fields are collected as string because this request is a multipart request
    // Because multipart requests can receives file uploads.
    // Multipart request only handle string field
    let images_urls = undefined;
    try { images_urls = JSON.parse(req.body.images_urls); } catch (_) { }
    const low_price = Number.parseFloat(req.body.low_price);
    const medium_price = Number.parseFloat(req.body.medium_price);
    const high_price = Number.parseFloat(req.body.high_price);
    const surface = Number.parseFloat(req.body.surface);
    const bathroom_count = Number.parseFloat(req.body.bathroom_count);
    const bedroom_count = Number.parseFloat(req.body.bedroom_count);

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
      Number.isNaN(bedroom_count) ||
      typeof category != "string" ||
      typeof type != "string" ||
      typeof chef != "string"
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
      bedroom_count,
      category,
      type,
      chef,
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
      chef,
    } = req.body;

    // Numeric and array fields are collected as string because this request is a multipart request
    // Because multipart requests can receives file uploads.
    // Multipart request only handle string field
    let images_urls = undefined;
    try { images_urls = JSON.parse(req.body.images_urls) } catch (_) { };
    let low_price = undefined;
    if (req.body.low_price != undefined) {
      low_price = Number.parseFloat(req.body.low_price);
    }
    let medium_price = undefined;
    if (req.body.medium_price != undefined) {
      medium_price = Number.parseFloat(req.body.medium_price);
    }
    let high_price = undefined;
    if (req.body.high_price != undefined) {
      high_price = Number.parseFloat(req.body.high_price);
    }
    let surface = undefined;
    if (req.body.surface != undefined) {
      surface = Number.parseFloat(req.body.surface);
    }
    let bathroom_count = undefined;
    if (req.body.bathroom_count != undefined) {
      bathroom_count = Number.parseFloat(req.body.bathroom_count);
    }
    let bedroom_count = undefined;
    if (req.body.bedroom_count != undefined) {
      bedroom_count = Number.parseFloat(req.body.bedroom_count);
    }

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
      (medium_price != undefined && Number.isNaN(medium_price)) ||
      (high_price != undefined && Number.isNaN(high_price)) ||
      (surface != undefined && Number.isNaN(surface)) ||
      (bathroom_count != undefined && Number.isNaN(bathroom_count)) ||
      (bedroom_count != undefined && Number.isNaN(bedroom_count)) ||
      (typeof category != "string" && category != undefined) ||
      (typeof type != "string" && type != undefined) ||
      (typeof chef != "string" && chef != undefined)
    ) {
      throw ControllerException.MALFORMED_REQUEST;
    }

    if (req.files != undefined && Array.isArray(req.files) && req.files.length != 0) {
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
      name: new_name,
      images_urls,
      area,
      description,
      low_price,
      medium_price,
      high_price,
      surface,
      bedroom_count,
      bathroom_count,
      category,
      type,
      chef,
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
        images_urls: true,
        area: true,
        description: true,
        low_price: true,
        medium_price: true,
        high_price: true,
        surface: true,
        bathroom_count: true,
        bedroom_count: true,
        category: true,
        type: true,
        chef: true
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

export async function listCategories(req: Request, res: Response) {
  try {
    if (!await isSessionConnected(req)) {
      throw ControllerException.UNAUTHORIZED;
    }

    const categories = Array.from(new Set((await database.getRepository(Housing).find({ select: { category: true } })).map(housing => housing.category)));

    res.status(200).send(categories);
  } catch (err) {
    handle_controller_errors(res, err);
  }
}

export async function listTypes(req: Request, res: Response) {
  try {
    if (!await isSessionConnected(req)) {
      throw ControllerException.UNAUTHORIZED;
    }

    const types = Array.from(new Set((await database.getRepository(Housing).find({ select: { type: true } })).map(housing => housing.type)));

    res.status(200).send(types);
  } catch (err) {
    handle_controller_errors(res, err);
  }
}
