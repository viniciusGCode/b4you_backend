import { Product } from '../entities/Product';
import { CreateProduct, UpdateProduct } from '../interfaces/IProduct';

export const createProduct = async (data: CreateProduct) => {
  return Product.create(data);
};

export const getProductById = async (id: number) => {
  return Product.findByPk(id);
};

export const getAllProducts = async () => {
  return Product.findAll();
};

export const updateProduct = async (data: UpdateProduct) => {
  const product = await Product.findByPk(data.id);
  if (!product) return null;
  return product.update(data);
};

export const deleteProduct = async (id: number) => {
  const product = await Product.findByPk(id);
  if (!product) return null;
  await product.destroy();
  return product;
};