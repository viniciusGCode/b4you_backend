import { Request, Response } from 'express';
import * as userRepository from '../repositories/userRespository';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';
import { loginUserValidate } from '../schemas/user.schema';

configDotenv();

const JWT_SECRET = process.env.JWT_SECRET || 'iWannaBeADevInB4You';

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res
      .status(400)
      .json({ error: 'Username and password are required' });

  try {
    loginUserValidate.validateSync(req.body, {
      abortEarly: false,
    });

    const user = await userRepository.getUserByUsername(username);
    if (!user || user.password !== password)
      return res.status(401).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ username: user.username }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Failed to login' });
  }
};
