import { Request, Response, NextFunction } from 'express';

export function adminAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers['x-admin-token'];

  if (!token || token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  next();
}
