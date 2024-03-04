import { Router } from 'express';

import * as EquipmentController from "../controllers/EquipmentController";

const router = Router();

router.get('/equipments', EquipmentController.list);
router.post('/equipment', EquipmentController.create);
router.put('/equipment', EquipmentController.modify);
router.delete('/equipment', EquipmentController.remove);

export default router;


