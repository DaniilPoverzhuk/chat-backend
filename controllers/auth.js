const checkValidateRequest = require("../utils/checkValidateRequest.js");

const ApiError = require("../error/handler.js");

const AuthService = require("../services/auth.js");
const TokenService = require("../services/token.js");
const UserService = require("../services/user.js");
const CookieService = require("../services/cookie.js");

class AuthController {
  async login(req, res, next) {
    try {
      checkValidateRequest(req);

      const user = await AuthService.login(req.body);

      if (!user) {
        throw new ApiError().BadRequest("При аутентификации произошла ошибка");
      }

      const tokens = TokenService.generate(req.body);

      if (!tokens) {
        throw new ApiError().BadRequest("При аутентификации произошла ошибка");
      }

      const savedTokens = await TokenService.save(tokens, user.id);

      if (!savedTokens) {
        throw new ApiError().BadRequest("При аутентификации произошла ошибка");
      }

      CookieService.set(res, tokens.refreshToken);

      return res.status(200).json({
        message: "Аутентификация прошла успешно",
        user: { ...user, ...tokens },
      });
    } catch (err) {
      next(err);
    }
  }

  async registration(req, res, next) {
    try {
      checkValidateRequest(req);

      const user = await AuthService.registration(req.body);

      if (!user) {
        throw new ApiError().BadRequest("При регистрации произошла ошибка");
      }

      const tokens = TokenService.generate(user);

      if (!tokens) {
        await UserService.delete(user.email);
        throw new ApiError().BadRequest("При регистрации произошла ошибка");
      }

      const savedTokens = await TokenService.save(tokens, user.id);

      if (!savedTokens) {
        await UserService.delete(user.email);
        throw new ApiError().BadRequest("При регистрации произошла ошибка");
      }

      CookieService.set(res, tokens.refreshToken);

      return res.status(200).json({
        message: "Регистрация прошла успешно",
        user: { ...user, ...tokens },
      });
    } catch (err) {
      next(err);
    }
  }

  async logout(_, res, next) {
    try {
      CookieService.delete(res);

      res.status(200).json({
        message: "Пользователь успешно вышел",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new AuthController();
