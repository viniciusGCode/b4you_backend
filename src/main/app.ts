import express from 'express';
import cors from 'cors';
import productRoutes from '../modules/product/routes';
import userRoutes from '../modules/user/routes';

const app = express();

app.use(cors({
  origin: 'http://localhost:3001',
  credentials: true
}));

app.use(express.json());

app.use('/products', productRoutes);
app.use('/users', userRoutes);

export default app;
