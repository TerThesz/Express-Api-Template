import { Request, Response, NextFunction } from  'express';
import { validationMiddleware } from '../middlewares';
import { error } from '../helpers';

export = (...switches: [ [ { [key: string]: Function }, { [key: string]: object } | undefined ] ]) => async (req: Request, res: Response, next: NextFunction) => {
  const method = req.method.toLocaleLowerCase();
  const switchObject = switches.find(_switch => _switch[0][method]);
  
  if (!switchObject) return error(res, 405);

  if (switchObject[1] && switchObject[1][method]) validationMiddleware(switchObject[1][method])(req, res, () => switchObject[0][method](req, res, next));
  else switchObject[0][method](req, res, next);
}
