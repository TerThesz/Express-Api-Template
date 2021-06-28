const router = new (require('express')).Router;
const { userValidation } = require('../validations');
const { validationMiddleware } = require('../middlewares');
const { userController } = require('../controllers');

router.all('/', validationMiddleware(userValidation), userController);

module.exports = router;