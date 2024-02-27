import express from 'express';

import UsersRouter from "./routes/UserRoutes";

const app = express();

app.use(express.json());

app.use('/users', UsersRouter);

export default app;
