import { Router } from 'express';

import * as UserController from "../controllers/UserController";

const router = Router();

router.get("/users", UserController.list);
router.post("/users", UserController.create);
router.post("/authentificate", UserController.authentificate);
router.delete("/delete_user/:email", UserController.deleteUser);
router.put("/update_user/:id", UserController.updateUser);

export default router;

