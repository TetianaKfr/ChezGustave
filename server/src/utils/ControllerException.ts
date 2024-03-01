import { Response } from "express";

export default class ControllerException extends Error {
  code: number
  client_message?: string
  server_message?: string

  static readonly MALFORMED_REQUEST = new ControllerException(400);
  static readonly UNAUTHORIZED = new ControllerException(401);
  static readonly NOT_FOUND = new ControllerException(404);
  static readonly CONFLICT = new ControllerException(409);

  constructor(code: number, client_message?: string, server_message?: string) {
    super("Http error: " + code);
    this.code = code;
    this.client_message = client_message;
    this.server_message = server_message;
  }
}

export function handle_controller_errors(res: Response, err: any) {
  if (err instanceof ControllerException) {
    if (err.client_message == undefined) {
      res.sendStatus(err.code);
    } else {
      res.status(err.code).send(err.client_message);
    }

    if (err.server_message != undefined) {
      console.error(err.server_message);
    }
  } else {
    console.error("Unknown exception: " + err);
    res.sendStatus(500);
  }
}
