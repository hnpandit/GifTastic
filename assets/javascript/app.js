// Rutgers Coding BootCamp - Full Stack Developer - Mon/Wed
// Homework GifTastic - Himanshu Pandit 
// December 15, 2018

// mykey - 0GiNgLMmlcfv3hmO5YRw46b4t2amN1iA
// Global variables

var leaders = ["Barrak Obama", "Mahatma Gandhi", "Narendra Modi", "George W. Bush", "George Washington", "Ronald Regan"];
var results = [];

// Object triviaGame
var giftastics = {  

  startGame: function() {

    $("#leaderButtons").empty();
    $("#textLeader").val('');
    
    for (var i = 0; i < leaders.length; i++) {

      var leaderBtn = $("<button>");

      leaderBtn.addClass("leader btn btn-default");
      leaderBtn.attr("world-leader", leaders[i]);
      leaderBtn.text(leaders[i]);
      
      $("#leaderButtons").append(leaderBtn);

    }
  }
};

$("#addleader").on("click", function() {
  if ($("#textLeader").val().trim().length === 0)
    alert("Please enter a world leader name");
  else
  {
    var strNewLeader = $("#textLeader").val().trim();

    if (leaders.indexOf(strNewLeader) > -1)
      alert("Leader already exists!");
    else
      leaders.push(strNewLeader);

    giftastics.startGame();
  }
});

function displayLeaderInfo()
{
  var worldLeader = $(this).attr("world-leader");

  // Constructing a queryURL using the world leader name
  var queryURL = "https://api.giphy.com/v1/gifs/search";
  queryURL = queryURL + "?q=" + worldLeader;
  queryURL = queryURL + "&rating=g&api_key=0GiNgLMmlcfv3hmO5YRw46b4t2amN1iA&limit=10";

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: "GET"
  })
    // After data comes back from the request
    .then(function(response) {
      
      // storing the data from the AJAX request in the results variable
      results =  [];
      results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) 
      {
        // Creating and storing a div tag
        var leaderDiv = $("<div>");

        // Creating a paragraph tag with the result item's rating
        var p = $("<p>").text("Rating: " + results[i].rating);

        // Creating and storing an image tag
        var leaderImage = $("<img>");

        // Setting the src attribute of the image to a property pulled off the result item
        leaderImage.attr("src", results[i].images.fixed_height_still.url);
        leaderImage.attr("width", "150px");
        leaderImage.attr("height", "150px");
        leaderImage.attr("data-state", "still");
        leaderImage.attr("index", i);
        leaderImage.addClass("leaderimage");

        leaderDiv.append(leaderImage);
        leaderDiv.append(p);

        var strGif = "#gif" + i;
        $(strGif).empty();
        $(strGif).append(leaderDiv);
      }
  });
};

$(document).on("click", ".leaderimage", function() 
{
    var state = $(this).attr("data-state");
    var index = $(this).attr("index");
   
    if (state === "still") {
        $(this).attr("src", results[index].images.fixed_height.url);
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", results[index].images.fixed_height_still.url);
        $(this).attr("data-state", "still");
    }
    giftastics.startGame();
});

$(document).on("click", ".leader", displayLeaderInfo);

// Start program here...
giftastics.startGame();