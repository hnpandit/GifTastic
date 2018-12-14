// Rutgers Coding BootCamp - Full Stack Developer - Mon/Wed
// Homework GifTastic - Himanshu Pandit 
// December 15, 2018

// mykey - 0GiNgLMmlcfv3hmO5YRw46b4t2amN1iA
// Global variables
// strMyKey = 0GiNgLMmlcfv3hmO5YRw46b4t2amN1iA;

var leaders = ["Barak Obama", "Mahatma Gandhi", "Narendra Modi", "George W. Bush", "George Washington", "Ronald Regan"];

// Object triviaGame
var giftastics = {  

  startGame: function() {

    $("#leaderButtons").empty();
    //$("#textLeader"

    for (var i = 0; i < leaders.length; i++) {

      // Inside the loop...

      // 2. Create a variable named "letterBtn" equal to $("<button>");
      var leaderBtn = $("<button>");

      // 3. Then give each "letterBtn" the following classes: "letter-button" "letter" "letter-button-color".
      leaderBtn.addClass("leader btn btn-default");

      // 4. Then give each "letterBtn" a data-attribute called "data-letter".
      leaderBtn.attr("world-leader", leaders[i]);

      // 5. Then give each "letterBtns" a text equal to "letters[i]".
      leaderBtn.text(leaders[i]);

      // 6. Finally, append each "letterBtn" to the "#buttons" div (provided).
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
      var results = response.data;

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
        leaderImage.addClass("leaderimage");

        leaderDiv.append(leaderImage);
        leaderDiv.append(p);

        var strGif = "#gif" + i;
        $(strGif).empty();
        $(strGif).append(leaderDiv);
      }
  });
};

function animateLeader()
{
    console.log(this);
  
    var state = $(this).attr("data-state");
    console.log(state);
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
};

$(document).on("click", ".leader", displayLeaderInfo);
$(document).on("click", ".leaderimage", animateLeader);

// Start program here...
giftastics.startGame();