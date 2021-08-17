import { Request, Response, NextFunction } from  'express';
import { validationMiddleware } from '../middlewares';
import { error } from '../helpers';

export = (controller: { [key: string]: Function }, validation: { [key: string]: Function } | undefined) => async (req: Request, res: Response, next: NextFunction) => {
  const method = req.method.toLocaleLowerCase();
  
  if (!controller) return error(res, 405);

  if (validation) validationMiddleware(validation[method])(req, res, () => controller[method](req, res, next));
  else controller[method](req, res, next);
}
