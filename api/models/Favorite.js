const S = require("sequelize");

const sequelize = require("../db/index");

class Favorite extends S.Model {}

Favorite.init(
    {
      nombreFav:{
        type: S.STRING,
        allowNull: false,
      },
      imagenFav:{
        type: S.TEXT,
        allowNull: false
      },
      favId:{
        type:S.INTEGER
      },
      unico:{
        type:S.STRING,
        allowNull: false,
        unique: true
      }
    },
    { sequelize, modelName: "favorite" }
  );
  
  module.exports = Favorite;