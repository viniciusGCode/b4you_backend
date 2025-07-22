import express from 'express';
import productRoutes from '../modules/product/routes';
import userRoutes from '../modules/user/routes';

const app = express();

app.use(express.json());

app.use('/products', productRoutes);

app.use('/users', userRoutes);

export default app;
