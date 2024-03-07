import express from "express";
import cors from "cors";

import UsersRouter from "./routes/UserRoutes";
import EquipmentsRouter from "./routes/EquipmentRoutes";
import HousingsRouter from "./routes/HousingsRouter";
import BookingRouter from "./routes/BookingRoutes";

const app = express();

app.use(express.json());
// TODO: Setup securised cors for production
app.use(cors());

app.use(UsersRouter);
app.use(EquipmentsRouter);
app.use(HousingsRouter);
app.use(BookingRouter);
app.use("/uploads", express.static('uploads'));

export default app;
