import * as userRepository from '../repositories/userRespository';
import { loginUserValidate } from '../schemas/user.schema';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

const JWT_SECRET = process.env.JWT_SECRET || 'iWannaBeADevInB4You';

export const login = async (username: string, password: string) => {
  if (!username || !password) {
    throw new Error('Username and password are required');
  }

  loginUserValidate.validateSync({ username, password }, { abortEarly: false });

  const user = await userRepository.getUserByUsername(username);
  if (!user || user.password !== password) {
    throw new Error('Invalid credentials');
  }

  const token = jwt.sign({ username: user.username }, JWT_SECRET, {
    expiresIn: '1h',
  });

  return { message: 'Login successful', token };
};
