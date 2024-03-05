"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.addConstraint("Tokens", {
      fields: ["user_id"],
      type: "foreign key",
      onDelete: "cascade",
      references: {
        table: "Users",
        field: "id",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.removeConstraint("Tokens", {
      fields: ["user_id"],
      type: "foreign key",
      onDelete: "cascade",
      references: {
        table: "Users",
        field: "id",
      },
    });
  },
};
