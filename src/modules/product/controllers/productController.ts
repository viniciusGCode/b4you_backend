import { Request, Response } from 'express';
import * as productService from '../services/productService';

export const create = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.errors });
    }
    res.status(400).json({ error: err.message || 'Failed to create product' });
  }
};

export const getById = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(Number(req.params.id));
    res.json(product);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
};

export const update = async (req: Request, res: Response) => {
  if (!req.params.id) {
    return res.status(400).json({ error: 'Product ID is required for update' });
  }

  const data = { id: Number(req.params.id), ...req.body };

  try {
    const updated = await productService.updateProduct(data);
    res.json(updated);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.errors });
    }
    res.status(400).json({ error: err.message || 'Failed to update product' });
  }
};

export const remove = async (req: Request, res: Response) => {
  try {
    const result = await productService.deleteProduct(Number(req.params.id));
    res.json(result);
  } catch (err: any) {
    res.status(404).json({ error: err.message });
  }
};