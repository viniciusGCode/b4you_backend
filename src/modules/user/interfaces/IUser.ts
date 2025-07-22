export interface User extends CreateUser {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUser {
  username: string;
  password: string;
}

export interface UpdateUser {
  id: number;
  username?: string;
  password?: string;
}

export interface UserRepository {
  createUser(data: CreateUser): Promise<User>;
  getUserById(id: number): Promise<User | null>;
  getAllUsers(): Promise<User[]>;
  updateUser(data: UpdateUser): Promise<User | null>;
  deleteUser(id: number): Promise<User | null>;
}
