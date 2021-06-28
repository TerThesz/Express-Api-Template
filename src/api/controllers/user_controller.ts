import { Request, Response, NextFunction } from 'express';

module.exports = async (req: Request, res: Response, next: NextFunction) => {
  res.send('Hello World!');
}