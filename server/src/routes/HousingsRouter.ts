import { Router } from 'express';
import multer from 'multer';

import * as HousingController from "../controllers/HousingController";

const router = Router();

router.get("/housings", HousingController.list);
router.post("/housings", multer().any(), HousingController.create);
router.delete("/housing", HousingController.remove);
router.put("/housing", HousingController.modify);
router.post("/housing", HousingController.get);

export default router;
