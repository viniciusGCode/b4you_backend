export interface Product extends CreateProduct {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProduct {
  name: string;
  description?: string;
  price: number;
  amount: number;
}

export interface UpdateProduct {
  id: number;
  name?: string;
  description?: string;
  price?: number;
  amount?: number;
}

export interface ProductRepository {
  createProduct(data: CreateProduct): Promise<Product>;
  getProductById(id: number): Promise<Product | null>;
  getAllProducts(): Promise<Product[]>;
  updateProduct(id: number, data: UpdateProduct): Promise<Product | null>;
  deleteProduct(id: number): Promise<Product | null>;
}
