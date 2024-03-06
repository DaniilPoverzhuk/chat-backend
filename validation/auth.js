const { body } = require("express-validator");

exports.login = () => [
  body("email")
    .exists()
    .withMessage("Required field")
    .isEmail()
    .withMessage("this field should be email"),
  body("password")
    .exists()
    .withMessage("Required field")
    .isString()
    .withMessage("Invalid data type, there must be a string"),
];

exports.registration = () => [
  body("username")
    .exists()
    .withMessage("Required field")
    .isString()
    .withMessage("Invalid data type, there must be a string")
    .isLength({ min: 3, max: 15 })
    .withMessage("Username length should be in the range of 3 - 15 characters"),
  body("email")
    .exists()
    .withMessage("Required field")
    .isEmail()
    .withMessage("this field should be email")
    .isLength({ min: 3, max: 30 })
    .withMessage("Email length should be in the range of 3 - 30 characters"),
  body("password")
    .exists()
    .withMessage("Required field")
    .isString()
    .withMessage("Invalid data type, there must be a string")
    .isLength({ min: 3, max: 20 })
    .withMessage("Password length should be in the range of 3 - 20 characters"),
  body("avatar").optional(),
];

exports.logout = () => [
  body("email")
    .exists()
    .withMessage("Required field")
    .isEmail()
    .withMessage("this field should be email"),
];
