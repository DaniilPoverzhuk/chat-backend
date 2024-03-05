const { User } = require("../models/index.js");

exports.delete = async (email) => {
  try {
    const deletedUser = await User.destroy({ where: { email } });

    return deletedUser;
  } catch (err) {
    return null;
  }
};
