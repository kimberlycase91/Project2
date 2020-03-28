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

    var gameSearch = $(this).data("id");
    console.log(gameSearch);
    var API_URL = "https://api.rawg.io/api/games/" + gameSearch;
    console.log(API_URL);
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": API_URL,
      "method": "GET",
    };
    $.ajax(settings).done(function(response) {
      res.render("game", {
        gameTitle: response.name,
        gameSummary: response.description,
        gameImage: response.background_image,
        gameID: response.id
      });
    });

    // res.render("game", {});
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
