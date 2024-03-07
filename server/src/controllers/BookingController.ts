import { Request, Response } from "express";

import { isSessionAdmin, isSessionConnected, sessionEmail } from "../utils/Session";
import ControllerException, { handle_controller_errors } from "../utils/ControllerException";
import database from "../database";
import Booking from "../entities/Booking";
import Housing from "../entities/Housing";
import User from "../entities/User";

export async function list(req: Request, res: Response) {
  try {
    if (!await isSessionConnected(req)) {
      throw ControllerException.UNAUTHORIZED;
    }

    const bookings_ids = (await database.getRepository(Booking).find({
      select: { id: true }
    })).map(booking => booking.id);

    res.status(200).send(bookings_ids);
  } catch (err) {
    handle_controller_errors(res, err);
  }
}

export async function create(req: Request, res: Response) {
  try {
    if (!await isSessionConnected(req)) {
      throw ControllerException.UNAUTHORIZED;
    }

    const email = sessionEmail(req);
    if (email == null) {
      throw ControllerException.UNAUTHORIZED;
    }

    const { housing_name, chef_available } = req.body;

    const start_str = req.body.start;
    const end_str = req.body.end;
    const visit_date_str = req.body.visit_date;

    if (
      typeof housing_name != "string" ||
      typeof start_str != "string" ||
      typeof end_str != "string" ||
      typeof chef_available != "boolean" ||
      typeof visit_date_str != "string"
    ) {
      throw ControllerException.MALFORMED_REQUEST;
    }

    const start = new Date(start_str);
    const end = new Date(end_str);
    const visit_date = new Date(visit_date_str);

    if (
      Number.isNaN(start.valueOf()) ||
      Number.isNaN(end.valueOf()) ||
      Number.isNaN(visit_date.valueOf())
    ) {
      throw ControllerException.MALFORMED_REQUEST;
    }

    const housing = await database.getRepository(Housing).findOneBy({ name: housing_name });
    const user = await database.getRepository(User).findOneBy({ email });
    if (housing == null || user == null) {
      throw ControllerException.NOT_FOUND;
    }

    await database.getRepository(Booking).save({
      start,
      end,
      chef_available,
      visit_date,
      housing,
      user,
    });

    res.sendStatus(201);
  } catch (err) {
    handle_controller_errors(res, err);
  }
}

export async function modify(req: Request, res: Response) {
  try {
    if (!await isSessionConnected(req)) {
      throw ControllerException.UNAUTHORIZED;
    }

    const email = sessionEmail(req);
    if (email == null) {
      throw ControllerException.UNAUTHORIZED;
    }

    const { id, chef_available } = req.body;

    const start_str = req.body.start;
    const end_str = req.body.end;
    const visit_date_str = req.body.visit_date;

    if (
      typeof id != "number" ||
      (typeof start_str != "string" && start_str != undefined) ||
      (typeof end_str != "string" && end_str != undefined) ||
      (typeof chef_available != "boolean" && chef_available != undefined) ||
      (typeof visit_date_str != "string" && visit_date_str != undefined)
    ) {
      throw ControllerException.MALFORMED_REQUEST;
    }

    let start = undefined;
    if (start_str != undefined) {
      start = new Date(start_str);
    }
    let end = undefined;
    if (end_str != undefined) {
      end = new Date(end_str);
    }
    let visit_date = undefined;
    if (visit_date_str != undefined) {
      visit_date = new Date(visit_date_str);
    }

    if (
      (start != undefined && Number.isNaN(start.valueOf())) ||
      (end != undefined && Number.isNaN(end.valueOf())) ||
      (visit_date != undefined && Number.isNaN(visit_date.valueOf()))
    ) {
      throw ControllerException.MALFORMED_REQUEST;
    }

    const bookings = database.getRepository(Booking);

    const booking = await bookings.findOne({
      relations: { user: true },
      where: { id },
    });

    if (booking == null) {
      throw ControllerException.NOT_FOUND;
    }

    if (booking?.user.email != email && !await isSessionAdmin(req)) {
      throw ControllerException.UNAUTHORIZED;
    }

    await bookings.update({ id }, {
      start,
      end,
      chef_available,
      visit_date,
    });

    res.sendStatus(200);
  } catch (err) {
    handle_controller_errors(res, err);
  }
}

export async function remove(req: Request, res: Response) {
  try {
    if (!await isSessionConnected(req)) {
      throw ControllerException.UNAUTHORIZED;
    }

    const email = sessionEmail(req);
    if (email == null) {
      throw ControllerException.UNAUTHORIZED;
    }

    const { id } = req.body;

    if (typeof id != "number") {
      throw ControllerException.MALFORMED_REQUEST;
    }

    const bookings = database.getRepository(Booking);

    const booking = await bookings.findOne({
      where: { id },
      relations: { user: true },
      select: { user: { email: true } }
    });

    if (booking == null) {
      throw ControllerException.NOT_FOUND;
    }
    
    if (booking.user.email != email && !await isSessionAdmin(req)) {
      throw ControllerException.UNAUTHORIZED;
    }

    const result = await bookings.delete({ id });
    if (result.affected == undefined || result.affected < 1) {
      throw ControllerException.NOT_FOUND;
    }

    res.sendStatus(200);
  } catch (err) {
    handle_controller_errors(res, err);
  }
}

export async function get(req: Request, res: Response) {
  try {
    if (!await isSessionConnected(req)) {
      throw ControllerException.UNAUTHORIZED;
    }

    const { id } = req.body;

    if (typeof id != "number") {
      throw ControllerException.MALFORMED_REQUEST;
    }

    const booking = await database.getRepository(Booking).findOne({
      where: { id },
      relations: {
        housing: true,
        user: true,
      },
    });

    if (booking == null) {
      throw ControllerException.NOT_FOUND;
    }

    res.status(200).send({
      start: booking.start,
      end: booking.end,
      chef_available: booking.chef_available,
      visit_date: booking.visit_date,
      housing_name: booking.housing.name,
      user_email: booking.user.email,
    });
  } catch (err) {
    handle_controller_errors(res, err);
  }
}
