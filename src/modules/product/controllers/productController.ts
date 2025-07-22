import { Request, Response } from 'express';
import * as productService from '../services/productService';

export const create = async (req: Request, res: Response) => {
  try {
    const product = await productService.createProduct(req.body);
    res.status(201).json(product);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: { message: 'Validation error', details: err.errors },
      });
    }
    if (err.message === 'Product with this ID already exists') {
      return res.status(409).json({
        error: { message: err.message },
      });
    }
    res.status(500).json({
      error: { message: 'Failed to create product', details: err.message },
    });
  }
};

export const getById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      error: { message: 'Invalid ID: must be a positive integer' },
    });
  }

  try {
    const product = await productService.getProductById(id);
    res.json(product);
  } catch (err: any) {
    if (err.message === 'Product not found') {
      return res.status(404).json({
        error: { message: err.message },
      });
    }
    res.status(500).json({
      error: { message: 'Failed to fetch product', details: err.message },
    });
  }
};

export const getAll = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (err: any) {
    res.status(500).json({
      error: { message: 'Failed to fetch products', details: err.message },
    });
  }
};

export const update = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      error: { message: 'Invalid ID: must be a positive integer' },
    });
  }

  const data = { id, ...req.body };

  try {
    const updated = await productService.updateProduct(data);
    res.json(updated);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: { message: 'Validation error', details: err.errors },
      });
    }
    if (err.message === 'Product not found') {
      return res.status(404).json({
        error: { message: err.message },
      });
    }
    res.status(500).json({
      error: { message: 'Failed to update product', details: err.message },
    });
  }
};

export const remove = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  if (isNaN(id) || id <= 0) {
    return res.status(400).json({
      error: { message: 'Invalid ID: must be a positive integer' },
    });
  }

  try {
    const result = await productService.deleteProduct(id);
    res.json(result);
  } catch (err: any) {
    if (err.message === 'Product not found') {
      return res.status(404).json({
        error: { message: err.message },
      });
    }
    res.status(500).json({
      error: { message: 'Failed to delete product', details: err.message },
    });
  }
};
