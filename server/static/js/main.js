var longURL = "";
var shortURL = "";
var letters = "";
$(function() {

  // ---- event handler ---- //
  $("#generateBlomo").click(function(e) {
    
    longURL = $("#long-URL").val();
    shortURL = $("#short-URL").val();
    letters = /^[0-9a-zA-Z]+$/;
    
    // Validate short URL is only letters
    console.log(shortURL);
    if (!(shortURL == null || shortURL == "")) {
       console.log("null or blank");
       if (!(shortURL.match(letters))) {
          console.log("not letters only");
          alert("Short path can contain only alphanumeric characters");
          return false;
       }
   } 

    if (longURL == null || longURL == "") {
      alert("Please enter a URL to blomo");
      return false;
    }

    if (shortURL.length>20) {
      console.log(shortURL.length)
      alert("Short path have a max of 20 characters");
      return false;
    }

    console.log("Long URL is: " + longURL);
    console.log("Short URL is: " + shortURL);
    $(".shortenedURL").empty().append(shortURL);

    // Show the confirmation page
    $("#confirmation").show();

  });

      
  $("#most-blomoed").hide();
  $("#most-visited").hide();
  $("#total-blomoed").hide();  


  $(".home").click(function(h) {
    $(".container").removeClass("stats");
    $("#most-blomoed").hide();
    $("#most-visited").hide();
    $("#total-blomoed").hide();
    $("#inputForm").show();
  });

  $(".most-visited").click(function(v) {
    $("#inputForm").hide();
    $(".container").addClass("stats");
    $("#most-blomoed").show();
    $("#total-blomoed").show();
    $("#most-visited").show();
  });
 

  $("#blomoAgain").click(function(e) {
    $("#inputForm").show();   
  });


});

