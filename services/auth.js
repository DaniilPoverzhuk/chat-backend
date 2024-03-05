const bcrypt = require("bcrypt");

const dto = require("../dto/index.js");
const ApiError = require("../error/handler");
const { User } = require("../models/index.js");

exports.login = async ({ email, password }) => {
  const user = dto(await User.findOne({ where: { email } }));

  if (!user) {
    throw new ApiError().BadRequest("Такой пользователь не зарегестрирован");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new ApiError().BadRequest("Неверный логин или пароль");
  }

  return user;
};

exports.registration = async (body) => {
  const user = await User.findOne({
    where: { email: body.email },
  });

  if (user) {
    throw new ApiError().BadRequest("Такой пользователь уже зарагестрирован");
  }

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const passwordHash = bcrypt.hashSync(body.password, salt);

  const newUser = dto(await User.create({ ...body, password: passwordHash }));

  return newUser;
};
