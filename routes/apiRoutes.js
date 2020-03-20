var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/game", function(req, res) {
    db.Review.findAll({}).then(function(dbReview) {
      res.json(dbReview);
    });
  });

  // Create a new example
  app.post("/api/game", function(req, res) {
    db.Review.create(req.body).then(function(dbReview) {
      res.json(dbReview);
    });
  });

  // Delete an example by id
  app.delete("/api/game/:id", function(req, res) {
    db.Review.destroy({ where: { id: req.params.id } }).then(function(dbReview) {
      res.json(dbReview);
    });
  });
};
