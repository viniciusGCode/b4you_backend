import { Request, Response } from 'express';
import * as userService from '../services/userService';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const result = await userService.login(username, password);
    res.json(result);
  } catch (err: any) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.errors });
    }
    res
      .status(err.message === 'Invalid credentials' ? 401 : 400)
      .json({ error: err.message || 'Failed to login' });
  }
};
