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
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      return res.status(412).json({
        success: false,
        message: 'Validation failed',
        data: err
      });
    }
    next();
  });
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
