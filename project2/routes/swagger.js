const express = require('express');
const swaggerUi = require('swagger-ui-express');

const router = express.Router();

// ✅ Use Swagger UI with dynamic URL loading
router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(null, {
    swaggerOptions: {
      url: '/swagger.json' // fetch dynamically at runtime
    }
  })
);

module.exports = router;




