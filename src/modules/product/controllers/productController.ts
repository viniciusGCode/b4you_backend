import { Request, Response } from 'express';
import * as productRepository from '../repositories/productRepository';
import {
  createProductSchema,
  deleteProductSchema,
  updateProductSchema,
} from '../schemas/product.schema';

export const create = async (req: Request, res: Response) => {
  try {
    await createProductSchema.validate(req.body, { abortEarly: false });

    const existingProduct = await productRepository.getProductById(req.body.id);
    if (existingProduct) {
      return res
        .status(400)
        .json({ error: 'Product with this ID already exists' });
    }

    const product = await productRepository.createProduct(req.body);
    res.status(201).json(product);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Failed to create product' });
  }
};

export const getById = async (req: Request, res: Response) => {
  const product = await productRepository.getProductById(Number(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
};

export const getAll = async (_req: Request, res: Response) => {
  const products = await productRepository.getAllProducts();
  res.json(products);
};

export const update = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ error: 'Product ID is required for update' });
  }

  const data = { id: Number(req.params.id), ...req.body };

  try {
    await updateProductSchema.validate(data, { abortEarly: false });

    const existingProduct = await productRepository.getProductById(data.id);
    if (!existingProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updated = await productRepository.updateProduct(data);
    res.json(updated);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.errors });
    }
    res.status(500).json({ error: 'Failed to update product', err });
  }
};

export const remove = async (req: Request, res: Response) => {
  await deleteProductSchema.validate(req.params, { abortEarly: false });

  const deleted = await productRepository.deleteProduct(Number(req.params.id));
  if (!deleted) return res.status(404).json({ error: 'Product not found' });
  res.json({ message: 'Product deleted' });
};
