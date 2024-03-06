import express from 'express';

import UsersRouter from "./routes/UserRoutes";
import EquipmentsRouter from "./routes/EquipmentRoutes";
import HousingsRouter from "./routes/HousingsRouter";

const app = express();

app.use(express.json());

app.use(UsersRouter);
app.use(EquipmentsRouter);
app.use(HousingsRouter);
app.use("/uploads", express.static('uploads'));

export default app;
