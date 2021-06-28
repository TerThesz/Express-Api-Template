const router = new (require('express')).Router;
const { userValidation } = require('../validations');
const { validationMiddleware } = require('../middlewares');

router.all('/', validationMiddleware(userValidation), (req, res, next) => {
  error(res, 401)
});

module.exports = router;