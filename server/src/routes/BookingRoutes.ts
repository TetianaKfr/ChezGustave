import { Router } from 'express';

import * as BookingController from "../controllers/BookingController";

const router = Router();


router.get("/bookings", BookingController.list);
router.post("/bookings", BookingController.create);
router.delete("/booking", BookingController.remove);
router.put("/booking", BookingController.modify);
router.post("/booking", BookingController.get);

export default router;

