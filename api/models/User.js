const S = require("sequelize");
const bcrypt = require("bcrypt");

const sequelize = require("../db/index");

class User extends S.Model {
  hash(password, salt) {
    return bcrypt.hash(password, salt);
  }

  validatePassword(password) {
     return this.hash(password, this.salt).then((newHash) => newHash === this.password);
  }
}

User.init(
  {
    email: {
      type: S.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
    name: {
      type: S.STRING,
      allowNull: false,
    },
    lastname: {
      type: S.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "user" }
);

User.beforeCreate((user) => {
  const salt = bcrypt.genSaltSync();

  user.salt = salt;

  return user.hash(user.password, salt).then((hash) => {
    user.password = hash;
  });
});

module.exports = User;
