var db = require("../models");

module.exports = function(app) {
  // Get all examples
  console.log(db);

  app.get("/api/review", function(req, res) {
    db.Review.findAll({}).then(function(dbReview) {
      res.json(dbReview);
    });
  });

  //Get one example
  app.get("/api/review/:game", function(req, res) {
    db.Review.findAll({
      where: {
        game: req.params.game
      }
    }).then(function(dbReview) {
      res.json(dbReview);
    });
  });

  // Create a new example
  app.post("/api/review", function(req, res) {
    db.Review.create(req.body).then(function(dbReview) {
      console.log("post api routes working?");
      console.log(req.body);
      res.json(dbReview);
    });
  });

  // Delete an example by id
  app.delete("/api/review/:id", function(req, res) {
    db.Review.destroy({
      where: { id: req.params.id }
    }).then(function(dbReview) {
      res.json(dbReview);
    });
  });
};
