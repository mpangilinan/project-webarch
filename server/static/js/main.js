var longURL = "";
var shortURL = "";

$(function() {

  // ---- event handler ---- //
  $("#generateBlomo").click(function(e) {
    longURL = $("#long-URL").val();
    shortURL = $("#short-URL").val();

    if (longURL == null || longURL == "") {
      alert("Please enter a URL to blomo");
      return false;
    }

    console.log("Long URL is: " + longURL);
    console.log("Short URL is: " + shortURL);
    $(".shortenedURL").empty().append(shortURL);

    // Show the confirmation page
    $("#confirmation").show();

    // Hide the input form
    // $("#inputForm").hide();
  });

  $("#blomoAgain").click(function(e) {
    $("#inputForm").show();   
//    $("#confirmation").hide();
  });


});

