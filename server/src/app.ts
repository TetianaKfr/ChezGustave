import express from 'express';

import UsersRouter from "./routes/UserRoutes";

const app = express();

app.use(express.json());

app.use(UsersRouter);

export default app;
