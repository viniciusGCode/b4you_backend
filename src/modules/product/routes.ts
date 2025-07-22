import { Router } from 'express';
import * as productController from './controllers/productController';
import { authMiddleware } from '../../shared/middlewares/auth';

const router = Router();

router.post('/', authMiddleware, productController.create);
router.get('/:id', productController.getById);
router.get('/', productController.getAll);
router.put('/:id', authMiddleware, productController.update);
router.delete('/:id', authMiddleware, productController.remove);

export default router;