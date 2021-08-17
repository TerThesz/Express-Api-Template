import { Request, Response, NextFunction } from  'express';
import { error } from '../helpers';

export = (schema: any) => async (req: Request, res: Response, next: Function) => {
  let errors = new Array<any>();
  const content = req.method.toLocaleLowerCase() === 'get' ? req.query : req.body;

  try {
    await schema.validate(content, { abortEarly: false });
    next();
  } catch (err) {
    if (!err.errors?.length) throw err;
    console.log(JSON.stringify(err, null, 2));

    if (req.method.toLocaleLowerCase() === 'get') errors = err.errors;
    else {
      try {
        await schema.validate(req.query, { abortEarly: false });
        next();
      } catch (_err) {
        if (!req.query.length) errors = _err.inner;
        else errors = err.inner;
      }
    }

    if (errors.length) {
      const additionalErrors = new Array<string>();

      errors.forEach((error: any) => {
        additionalErrors.push(`ce.0.${error.name}.${error.message}`);
      });
      
      error(res, 400, additionalErrors);
    }
  }
}
