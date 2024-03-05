const jwt = require("jsonwebtoken");

const dto = require("../dto/index.js");
const { Token } = require("../models/index.js");

exports.generate = (payload) => {
  try {
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      {
        expiresIn: "30d",
      }
    );

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "15m",
    });

    return { refreshToken, accessToken };
  } catch (err) {
    return null;
  }
};

exports.save = async ({ refreshToken }, user_id) => {
  try {
    const tokens = await Token.findOne({ where: { user_id } });

    if (tokens) {
      return await Token.update({ refreshToken }, { where: { user_id } });
    }

    const newToken = dto(await Token.create({ refreshToken, user_id }));

    return newToken;
  } catch (err) {
    return null;
  }
};
