import express from 'express';

import UsersRouter from "./routes/UserRoutes";
import EquipmentsRouter from "./routes/EquipmentRoutes";

const app = express();

app.use(express.json());

app.use(UsersRouter);
app.use(EquipmentsRouter);

export default app;
