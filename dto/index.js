module.exports = (payload) => {
  if (!payload) return null;

  const { dataValues } = payload;

  return dataValues;
};
