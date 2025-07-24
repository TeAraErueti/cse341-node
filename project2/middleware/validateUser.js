const validator = require('../frontend/helpers/validate');

// Middleware to validate user data on POST/PUT
const saveUser = (req, res, next) => {
  const validationRule = {
    firstName: 'required|string',
    lastName: 'required|string',
    email: 'required|email',
    nationality: 'string',
    birthday: 'string',
    address: 'string',
    phone: 'string',
  };

  try {
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          data: err
        });
      }
      next();
    });
  } catch (error) {
    console.error('Validation middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error during validation.',
      error: error.message
    });
  }
};

// Middleware to validate MongoDB ObjectId in params.id
const checkId = (req, res, next) => {
  const idRegex = /^[0-9a-fA-F]{24}$/;
  if (!idRegex.test(req.params.id)) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      data: { id: ['The id parameter must be a valid MongoDB ObjectId'] }
    });
  }
  next();
};

module.exports = {
  saveUser,
  checkId
};
