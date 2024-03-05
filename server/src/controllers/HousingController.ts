import { Request, Response } from "express";
import { DeepPartial, QueryFailedError } from "typeorm";

import ControllerException, { handle_controller_errors } from "../utils/ControllerException";
import database from "../database";
import Housing from "../entities/Housing";
import { isSessionAdmin, isSessionConnected } from "../utils/Session";

export async function list(req: Request, res: Response) {
    try {
    //   if (!await isSessionConnected(req)) {
    //     throw ControllerException.UNAUTHORIZED;
    //   }
      
      let housing = database.getRepository(Housing);
      let name = (await housing.find(
        { select: {name:true} })).map(housing => housing.name);
  
      res.status(200).send(name);
    } catch (err) {
      handle_controller_errors(res, err);
    }
  }

  export async function create(req: Request, res: Response) {
    try {
    //   if (!await isSessionAdmin(req)) {
    //     throw ControllerException.UNAUTHORIZED;
    //   }
  
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

      console.log(area);
  
      const housing: DeepPartial<Housing> = {
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

      try {
        await database.getRepository(Housing).save(housing);
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

  export async function remove(req: Request, res: Response) {
    try {
  
  
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

      const name_params: string = req.params.name;
  
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
  
      try {
        await database.getRepository(Housing).update({ name: name_params }, housing);
      } catch (err) {
        if (err instanceof QueryFailedError && err.driverError.code == "23505") {
          throw ControllerException.CONFLICT;
        }
        throw err;
      }
  
      res.sendStatus(200);
    } catch (err) {
      return handle_controller_errors(res, err);
    }
  }
  
  
export async function get(req: Request, res: Response) {
  try {
    
    const name_params: string = req.params.name;
  
    const result = await database.getRepository(Housing).findOne({
      select: ["name", "images_urls", "area", "description", "low_price"
      ,"medium_price", "high_price", "surface", "bathroom_count", "category", "type"],
      where: {
        name: name_params
      }
    });

    res.status(200).send(result);
  } catch (err) {
    handle_controller_errors(res, err);
  }
}