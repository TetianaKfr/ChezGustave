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

  send(res: Response) {
    if (this.client_message == undefined) {
      res.sendStatus(this.code);
    } else {
      res.status(this.code).send(this.client_message);
    }

    if (this.server_message != undefined) {
      console.error(this.server_message);
    }
  }
}

