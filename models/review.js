module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define("Review", {
    author: DataTypes.STRING,
    game: DataTypes.INTEGER,
    text: DataTypes.TEXT,
    rating: DataTypes.INTEGER
  });
  return Review;
};
