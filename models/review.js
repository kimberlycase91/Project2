module.exports = function(sequelize, DataTypes) {
  var Review = sequelize.define("reviews", {
    author: DataTypes.STRING,
    game: DataTypes.STRING,
    text: DataTypes.TEXT,
    rating: DataTypes.INTEGER
  });
  return Review;
};
