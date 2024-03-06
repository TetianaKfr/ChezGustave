import { Router } from 'express';
import multer from 'multer';

import * as HousingController from "../controllers/HousingController";

const router = Router();

router.get("/housing", HousingController.list);
router.post("/housing", multer().any(), HousingController.create);
router.delete("/housing/:name", HousingController.remove);
router.put("/housing/:name", HousingController.modify);
router.get("/housing/:name", HousingController.get);

export default router;
