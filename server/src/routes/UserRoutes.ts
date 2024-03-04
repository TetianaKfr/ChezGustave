import { Router } from 'express';

import * as UserController from "../controllers/UserController";

const router = Router();

router.get("/users", UserController.list);
router.post("/users", UserController.create);
router.delete("/users/:email", UserController.remove);
router.put("/users/:email", UserController.modify);
router.get("/users/:email", UserController.get);

router.post("/authentificate", UserController.authentificate);

export default router;

