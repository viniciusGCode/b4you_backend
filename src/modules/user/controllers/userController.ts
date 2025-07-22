import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({
        error: { message: 'Username and password are required' },
      });
    }
    const result = await userService.login(username, password);
    res.json(result);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({
        error: { message: 'Validation error', details: err.errors },
      });
    }
    if (err.message === 'Invalid credentials') {
      return res.status(401).json({
        error: { message: err.message },
      });
    }
    res.status(500).json({
      error: { message: 'Failed to login', details: err.message },
    });
  }
};
