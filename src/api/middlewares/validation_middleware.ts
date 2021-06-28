import { Request, Response, NextFunction } from  'express';
const { error } = require('../helpers');

module.exports = (schema: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    error(res, 400, err.errors);
  }
}