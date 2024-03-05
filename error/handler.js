class ApiError {
  constructor(message, status, errors) {
    this.message = message;
    this.status = status;
    this.errors = errors;
  }

  BadRequest(message, errors = []) {
    throw new ApiError(message, 400, errors);
  }

  Unauthorized() {
    throw new ApiError("The user is not logged in", 401);
  }
}

module.exports = ApiError;
