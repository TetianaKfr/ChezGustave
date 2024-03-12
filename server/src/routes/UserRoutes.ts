import { Router } from 'express';

import * as UserController from "../controllers/UserController";

const router = Router();

router.get("/users", UserController.list);
router.post("/users", UserController.create);
router.delete("/user", UserController.remove);
router.put("/user", UserController.modify);
router.post("/user", UserController.get);
router.post("/users/coopt", UserController.coopt);
router.get("/users/coopt/accept/:id/:token", UserController.acceptCooptation);
router.get("/users/coopt/deny/:id/:token", UserController.denyCooptation);

router.post("/authenticate", UserController.authenticate);

export default router;

