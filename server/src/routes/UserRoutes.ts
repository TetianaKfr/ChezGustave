import { Router } from 'express';

import * as UserController from "../controllers/UserController";

const router = Router();

router.get("/users", UserController.list);
router.post("/user", UserController.create);
router.delete("/user", UserController.remove);
router.put("/user", UserController.modify);
router.post("/user", UserController.get);

router.post("/authenticate", UserController.authenticate);

export default router;

