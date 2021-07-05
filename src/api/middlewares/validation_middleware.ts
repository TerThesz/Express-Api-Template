import { Request, Response, NextFunction } from  'express';
const { error } = require('../helpers');

export = (schema: any, validateBody: boolean = false) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    err.errors.forEach((error: string) => {
      const [ section, status, ...args ] = error.split('.');
      if (!section || !status) err.errors[err.errors.indexOf(error)] = 'defaultValidationError.0.' + error;
    });

    console.log(err.errors)
    error(res, 400, err.errors);
  }
}
