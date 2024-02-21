import express from 'express';

const app = express();

// Define global middlewares here:

app.get('/', (req, res) => {
    res.send('Hello world');
});

// Register all routers
import ExampleRouter from './routes/ExampleRoutes';
app.use('/example', ExampleRouter);

export default app;