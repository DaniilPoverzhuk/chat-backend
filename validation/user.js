const { body } = require("express-validator");

exports.getAll = () => [
  body("email")
    .exists()
    .withMessage("Required field")
    .isEmail()
    .withMessage("this field should be email"),
];
