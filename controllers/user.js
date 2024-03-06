const ApiError = require("../error/handler");

const UserService = require("../services/user.js");

class UserController {
  async getAll(req, res, next) {
    try {
      const { email } = req.body;

      const users = await UserService.getAll(email);

      if (!users) {
        throw new ApiError().BadRequest(
          "При получении пользователей произошла ошибка"
        );
      }

      res.status(200).json({
        message: "Пользователи успешно получены",
        users,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new UserController();
