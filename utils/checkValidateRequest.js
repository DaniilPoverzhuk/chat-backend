const { validationResult } = require("express-validator");
const ApiError = require("../error/handler.js");

module.exports = (req) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    throw new ApiError().BadRequest(
      "An error occurred during data validation",
      result.array()
    );
  }
};
