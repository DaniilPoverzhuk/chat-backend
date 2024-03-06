const { User } = require("../models/index.js");
const { Op } = require("sequelize");

exports.delete = async (email) => {
  try {
    const deletedUser = await User.destroy({ where: { email } });

    return deletedUser;
  } catch (err) {
    return null;
  }
};

exports.getAll = async (email) => {
  try {
    const users = await User.findAll({ where: { [Op.not]: { email } } });

    return users;
  } catch (err) {
    console.log("UserService.getAll error - ", err);
    return null;
  }
};
