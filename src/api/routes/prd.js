var router = new (require('express')).Router;
const { error } = require('../helpers');

router.all('/', (req, res, next) => {
  error(res, 401)
});

module.exports = router;