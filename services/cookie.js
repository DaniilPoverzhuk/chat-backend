exports.set = (res, refreshToken) => {
  res.cookie(process.env.COOKIE_REFRESH_TOKEN_KEY, refreshToken, {
    maxAge: 3600 * 24,
    httpOnly: true,
  });
};

exports.delete = (res) => {
  res.clearCookie(process.env.COOKIE_REFRESH_TOKEN_KEY);
};
