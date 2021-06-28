const { error } = require('../helpers');

module.exports = schema => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next();
  } catch (err) {
    error(res, 400, err.errors);
  }
}