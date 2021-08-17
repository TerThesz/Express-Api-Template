import { Request, Response, NextFunction } from  'express';
import { error } from '../helpers';

export = (schema: any, validateBody: boolean = false) => async (req: Request, res: Response, next: Function) => {
  const content = validateBody ? req.body : req.query;
  
  try {
    await schema.validate(content, { abortEarly: false });
    next();
  } catch (err) {
    if (!err.errors?.length) throw err;
    
    err.errors.forEach((error: string) => {
      const [ section, status, ...args ] = error.split('.');
      if (!section || !status) err.errors[err.errors.indexOf(error)] = 'ce.0.' + error;
    });
    
    error(res, 400, err.errors);
  }
}
