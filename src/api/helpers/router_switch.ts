import { Request, Response, NextFunction } from  'express';
import { validationMiddleware } from '../middlewares';
import { error } from '../helpers';

export = (...switches: [ [ string, Function, any ] ]) => async (req: Request, res: Response, next: NextFunction) => {
  const switchObject = switches.find(_switch => _switch[0] === req.method.toLocaleLowerCase());
  
  if (!switchObject) return error(res, 405);

  validationMiddleware(switchObject[2])(req, res, () => switchObject[1](req, res, next));
}