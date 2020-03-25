$(document).ready(function () {
  // Get references to page elements
  var gameTitle = $("#gameTitle");
  var gameSummary = $("#gameSummary");
  var submitBtn = $("#submit");
  var reviewList = $("#reviews");
  // Add event listeners to the submit and delete buttons
  submitBtn.on("click", handleFormSubmit);
  // $deleteBtn.on("click", "button.delete", handleDeleteBtnClick);

  // The API object contains methods for each kind of request we'll make
  var API = {
    postReview: function () {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/review",
        data: JSON.stringify()
      });
    },
    getReview: function () {
      return $.ajax({
        url: "api/review",
        type: "GET"
      });
    },
    deleteReview: function (id) {
      return $.ajax({
        url: "api/review/" + id,
        type: "DELETE"
      });
    }
  };

  // refreshExamples gets new examples from the db and repopulates the list
  var refreshReviews = function () {
    API.getReview().then(function (data) {
      var reviews = data.map(function (review) {
        var gameID = $(("#search").val().join().toLowerCase());
        var $a = $("<a>")
          .text(review.text)
          .attr("href", "/models/review/" + dbReview)

        var $li = $("<li>")
          .attr({
            class: "list-group-item",
            "data-id": review.id
          })
          .append($a);

        var $button = $("<button>")
          .addClass("btn btn-danger float-right delete")
          .text("ｘ");

        $li.append($button);

        return $li;
      });

      reviewList.empty();
      reviewList.append(reviews);
    });
  };
  // handleFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list
  var handleFormSubmit = function (event) {
    event.preventDefault();

    var gameInfo = {
      text: gameTitle.val().trim(),
      description: gameSummary.val().trim(),
      image: gameImage.val().trim()
    };

    if (!(gameTitle.text && gameSummary.description)) {
      alert("You must enter an example text and description!");
      return;
    }

    API.postReview(example).then(function () {
      refreshReviews();
    });

    gameTitle.val("");
    gameSummary.val("");
    gameImage.val("");
  };

  // handleDeleteBtnClick is called when an example's delete button is clicked
  // Remove the example from the db and refresh the list
  var handleDeleteBtnClick = function () {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");

    API.deleteReview(idToDelete).then(function () {
      refreshReviews();
    });
  };
  // Get references to page elements
  var $submit = $("#submit");
  var $results = $("#resultBox");
  var $gameInfo = $("#gameInfo");

  $("#submit").on("click", function() {
    event.preventDefault();
    $results.empty();
    console.log("searching for game...");
    console.log($("#game-input").val());
    //take in game search and change to lower case and replace spaces with '-'
    var gameSearch = $("#game-input").val()
    gameSearch = gameSearch.toLowerCase();
    gameSearch = gameSearch.replace(/[^a-zA-Z0-9 ]+/g, "");
    gameSearch = gameSearch.replace(/\s+/g, "-");

    var API_URL = "https://api.rawg.io/api/games/" + gameSearch;
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": API_URL,
      "method": "GET",
    };
    console.log(API_URL);
    $.ajax(settings).done(function(response) {
      console.log(response);
      console.log(response.name);
      var newResult = $("<div>");
      var gameName = $("<a>");
      gameName.text(response.name);
      gameName.attr("href", "/game/" + response.id);
      newResult.append(gameName);
      var gameSummary = $("<p>");
      gameSummary.append(response.description);
      newResult.append(gameSummary);
      $results.append(newResult);
    });
  });
});
