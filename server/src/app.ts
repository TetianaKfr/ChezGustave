import express from 'express';

const app = express();

// Define global middlewares here:

app.get('/', (req, res) => {
    res.send('Hello world');
});

// Register all routers
app.use('/example', require('./routes/ExampleRoutes'));

export default app;