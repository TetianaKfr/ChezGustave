import { Router } from 'express';

import * as EquipmentController from "../controllers/EquipmentController";

const router = Router();

router.post('/equipments', EquipmentController.create);

export default router;


