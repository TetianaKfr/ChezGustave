import { Router } from 'express';

import * as HousingController from "../controllers/HousingController";

const router = Router();

router.get("/housing", HousingController.list);
router.post("/housing", HousingController.create);
router.delete("/housing/:name", HousingController.remove);

export default router;
