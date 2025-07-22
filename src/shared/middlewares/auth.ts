import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { configDotenv } from 'dotenv';

configDotenv();

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export interface AuthRequest extends Request {
  user?: any;
}

export const authMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const [, token] = authHeader.split(' ');
  if (!token) return res.status(401).json({ error: 'Token malformed' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ error: 'Token invalid' });
  }
};
