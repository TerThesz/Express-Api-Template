import { Request, Response, NextFunction } from  'express';
const errorCodes = require('../../config/codes');

export = new class Status {
  error = (res: Response, status: number = 500, _errors: Array<string>) => {
    let errors: any[] = [];
    _errors.map((_error: any) => {
      let [ _section, _status, ..._args ] = _error.split('.');
      _status = parseInt(_status);

      let _message = errorCodes[_section][_status](..._args);

      errors.push({
        code: _status,
        message: _message[0],
        detail: _message[1]
      })
    });

    res.status(status).json({
      status,
      message: errorCodes.statusCodes[status]()[0],
      detail: errorCodes.statusCodes[status]()[1],
      errors
    })
  }

  success = (res: Response) => res.status(200).json({status: 200, message: errorCodes.statusCodes[200][0], detail: errorCodes.statusCodes[200][1]});
}