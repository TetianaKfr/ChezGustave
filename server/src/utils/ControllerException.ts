import { Response } from "express";

export default class ConstrollerException extends Error {
  code: number
  client_message?: string
  server_message?: string

  constructor(code: number, client_message?: string, server_message?: string) {
    super("Http error: " + code);
    this.code = code;
    this.client_message = client_message;
    this.server_message = server_message;
  }
}

export function handle_controller_errors(res: Response, err: any) {
  if (err instanceof ConstrollerException) {
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
