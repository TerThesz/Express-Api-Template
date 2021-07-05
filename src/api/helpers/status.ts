import { Request, Response, NextFunction } from  'express';
const errorCodes = require('../../config/codes');

export = new class Status {
  error = (res: Response, status: number = 500, errors: Array<string>) => {
    let additionalErrors: any[] = [];
    errors.map((error: any) => {
      let [ section, status, ...args ] = error.split('.');

      status = status === '0' ? 400 : parseInt(status);

      let message = section === 'defaultValidationError' ? args : errorCodes[section][status](...args);

      additionalErrors.push({
        code: status,
        message: message[0],
        detail: message[1]
      })
    });

    res.status(status).json({
      status,
      message: errorCodes.sc[status]()[0],
      detail: errorCodes.sc[status]()[1],
      additionalErrors
    })
  }

  success = (res: Response) => res.status(200).json({status: 200, message: errorCodes.statusCodes[200][0], detail: errorCodes.statusCodes[200][1]});
}
