const User = require("./User");
const Favorite = require("./Favorite");

User.hasMany(Favorite)
Favorite.belongsTo(User, {as: "author"})

module.exports =  {User, Favorite};