import { Router } from 'express';

import * as EquipmentController from "../controllers/EquipmentController";

const router = Router();

router.get('/equipments', EquipmentController.list);
router.post('/equipments', EquipmentController.create);
router.put('/equipments', EquipmentController.modify);

export default router;


