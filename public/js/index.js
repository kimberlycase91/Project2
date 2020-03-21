$(document).ready(function() {
  // Get references to page elements
  var gameTitle = $("#gameTitle");
  var gameSummary = $("#gameSummary");
  var submitBtn = $("#submit");
  var reviewList = $("#reviews");
  // Add event listeners to the submit and delete buttons
  submitBtn.on("click", handleFormSubmit);
  $deleteBtn.on("click", "button.delete", handleDeleteBtnClick);

  // The API object contains methods for each kind of request we'll make
  var API = {
    postReview: function() {
      return $.ajax({
        headers: {
          "Content-Type": "application/json"
        },
        type: "POST",
        url: "api/review",
        data: JSON.stringify()
      });
    },
    getReview: function() {
      return  $.ajax({
        url: "api/review",
        type: "GET"
      }); 
  },
  deleteReview: function(id) {
    return $.ajax({
      url: "api/review/" + id,
      type: "DELETE"
      });
    }
  };

  // refreshExamples gets new examples from the db and repopulates the list
  var refreshReviews = function() {
    API.getReview().then(function(data) {
      var reviews = data.map(function(review) {
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
  // handleFormSubmit is called whenever we submit a new example
  // Save the new example to the db and refresh the list
  var handleFormSubmit = function(event) {
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

    API.postReview(example).then(function() {
      refreshReviews();
    });

    gameTitle.val("");
    gameSummary.val("");
    gameImage.val("");
  };

  // handleDeleteBtnClick is called when an example's delete button is clicked
  // Remove the example from the db and refresh the list
  var handleDeleteBtnClick = function() {
    var idToDelete = $(this)
      .parent()
      .attr("data-id");

    API.deleteReview(idToDelete).then(function() {
      refreshReviews();
    });
  };
  // Get references to page elements
  var $submit = $("#submit");
  var $results = $("#resultBox");
  var $gameInfo = $("#gameInfo");
  var APIkey = "278971f36b31bc8cf08118637d493047289c1aaa" //put this string in .env as APIkey="278971f36b31bc8cf08118637d493047289c1aaa" then change the value here to process.env.APIkey
  var API_URL = "https://www.gamespot.com/api/games/?api_key=" + APIkey + "&format=json&limit=10&sort=release_date:dsc&filter=name:"

  $("#submit").on("click", function (){
  event.preventDefault();
  console.log("searching for game...");
  console.log($("#game-input").val());
  gameName = $("#game-input").val().trim()
  $.ajax({
    url: API_URL + gameName,
    conentType: "application/json",
    dataType: "json",
      success: function (data) {
        console.log(data);
        for (var i=0; i < data.results.length; i++) {
            var newResult = ("<div>");
            var gameName = ("<h3>");
            gameName.text(data.results[i].name);
            newResult.append(gamename);
            var gameSummary = ("<p>");
            gameSummary.text(data.results[i].description);
            newResult.append(gameSummary);
            $results.append(newResult);
         }
      }
    })
  })
});