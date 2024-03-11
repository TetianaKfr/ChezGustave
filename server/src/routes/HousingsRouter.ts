import { Router } from 'express';
import multer from 'multer';

import * as HousingController from "../controllers/HousingController";

const router = Router();

router.get("/housings", HousingController.list);
router.post("/housings/search", HousingController.search);
router.post("/housings", multer().any(), HousingController.create);
router.delete("/housing", HousingController.remove);
router.put("/housing", multer().any(), HousingController.modify);
router.post("/housing", HousingController.get);
router.get("/categories", HousingController.listCategories);
router.get("/types", HousingController.listTypes);

export default router;
