var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index", {
      msg: "Welcome!"
    });
  });

  // Load example page and pass in an example by id
  app.get("/game/:id", function(req, res) {
    // db.Review.findOne({ where: { game: req.params.id } }).then(function(dbReview) {
    res.render("game", {
      // });
    });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
