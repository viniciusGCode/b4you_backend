import * as productRepository from '../repositories/productRepository';
import {
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
} from '../schemas/product.schema';
import { Product } from '../interfaces/IProduct';

export const createProduct = async (data: Product) => {
  await createProductSchema.validate(data, { abortEarly: false });

  const existingProduct = await productRepository.getProductById(data.id);
  if (existingProduct) {
    throw new Error('Product with this ID already exists');
  }

  return productRepository.createProduct(data);
};

export const getProductById = async (id: number) => {
  const product = await productRepository.getProductById(id);
  if (!product) {
    throw new Error('Product not found');
  }
  return product;
};

export const getAllProducts = async () => {
  return productRepository.getAllProducts();
};

export const updateProduct = async (data: Product) => {
  await updateProductSchema.validate(data, { abortEarly: false });

  const existingProduct = await productRepository.getProductById(data.id);
  if (!existingProduct) {
    throw new Error('Product not found');
  }

  return productRepository.updateProduct(data);
};

export const deleteProduct = async (id: number) => {
  await deleteProductSchema.validate({ id }, { abortEarly: false });

  const deleted = await productRepository.deleteProduct(id);
  if (!deleted) {
    throw new Error('Product not found');
  }
  return { message: 'Product deleted' };
};
