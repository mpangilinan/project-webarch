var longURL = "";
var shortURL = "";
var letters = "";
$(function() {

  // ---- event handler ---- //
  $("#generateBlomo").click(function(e) {
    



    longURL = $("#long-URL").val();
    shortURL = $("#short-URL").val();
    letters = /^[A-Za-z]_$/;
    
    // Validate short URL is only letters
    console.log(shortURL);
    if (!(shortURL == null || shortURL == "")) {
       console.log("null or blank");
       if (!(shortURL.match(letters))) {
          alert("Short path can contain only letters");
          return false;
       }
   } 



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

