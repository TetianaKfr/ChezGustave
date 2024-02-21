import { Router } from 'express';
import * as ExampleController from '../controllers/ExampleController';
import { ExampleMiddleware } from '../middlewares/ExampleMiddlewares';

const router = Router();

// Each routes links to a controller function, and can use some middlewares
router.get('/', ExampleMiddleware, ExampleController.getExampleText);

export default router;