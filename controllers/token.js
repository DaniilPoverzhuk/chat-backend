const TokenService = require("../services/token.js");
const ApiError = require("../error/handler.js");

class TokenController {
  async update(req, res, next) {
    try {
      const refreshToken = TokenService.getRefreshTokenFromCookie(req);

      if (!refreshToken || refreshToken === "null") {
        throw new ApiError().Unauthorized();
      }

      const { exp, iat, ...user } =
        TokenService.isValidRefreshToken(refreshToken);

      if (!user) {
        throw new ApiError().Unauthorized();
      }

      const tokens = TokenService.generate(user);

      await TokenService.save(user.id, tokens);

      res.cookie(process.env.COOKIE_REFRESH_TOKEN_KEY, tokens.refreshToken);

      return res.status(200).json({
        message: "Токен был успешно обновлен",
        user: {
          ...user,
          ...tokens,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  async check(req, res, next) {
    try {
      const accessToken = req.headers?.authorization;

      if (!accessToken || accessToken === "null") {
        throw new ApiError().Unauthorized();
      }

      const isValidAccessToken = TokenService.isValidAccessToken(accessToken);

      if (!isValidAccessToken) {
        const refreshToken = TokenService.getRefreshTokenFromCookie(req);

        if (!refreshToken) {
          throw new ApiError().Unauthorized();
        }

        const isValidRefreshToken =
          TokenService.isValidRefreshToken(refreshToken);

        if (!isValidRefreshToken) {
          throw new ApiError().Unauthorized();
        }

        const { exp, iat, ...user } = isValidRefreshToken;
        const tokens = TokenService.generate(user);

        await TokenService.save(tokens, user.id);

        return res.status(200).json({
          message: "Токены были обновлены",
          user: { ...user, ...tokens },
        });
      }

      const refreshToken = TokenService.getRefreshTokenFromCookie(req);
      const user = { ...isValidAccessToken, accessToken, refreshToken };

      return res.status(200).json({
        message: "Токен валидный",
        user,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = new TokenController();
