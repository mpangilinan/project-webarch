var longURL = "";
var shortURL = "";

$(function() {

  // hide the confirmation page from view
  $("#confirmation").hide();

  // ---- event handler ---- //
  $("#generateBlomo").click(function(e) {
    console.log("Do I ever get here?");
    longURL = $("#long-URL").val();
    shortURL = $("#short-URL").val();
    console.log("Long URL is: " + longURL);
    console.log("Short URL is: " + shortURL);
    $(".shortenedURL").empty().append(shortURL);

    // Show the confirmation page
    $("#confirmation").show();

    // Hide the input form
    $("#inputForm").hide();
  });

  $("#blomoAgain").click(function(e) {
    $("#inputForm").show();   
    $("#confirmation").hide();
  });


});

