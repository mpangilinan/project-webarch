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

  $(".stats").click(function(s) {
      $(".card").addClass("flipped");
      // setTimeout(function(){

      //   $("#stats-data").show();
      //   }, 100); 
  });

  $(".home").click(function(h) {
    $("#most-blomoed").hide();
    $("#most-visited").hide();
    $("#total-blomoed").hide();
    setTimeout(function() {
      $("#inputForm").show();
    }, 100);
  });

// $(".most-blomoed").click(function(b) {
//     $("#inputForm").hide();
    
//     setTimeout(function() {
//       $("#most-blomoed").show();
//       $("#most-visited").show();
//       $("#total-blomoed").show();
//     }, 100);
//   });


  $(".most-blomoed").click(function(b) {
    $("#inputForm").hide();
    $("#most-visited").hide();
    $("#total-blomoed").hide();
    setTimeout(function() {
      $("#most-blomoed").show();
    }, 100);
  });

  $(".most-visited").click(function(v) {
    $("#inputForm").hide();
    $("#most-blomoed").hide();
    $("#total-blomoed").hide();
    setTimeout(function() {
      $("#most-visited").show();
    }, 100);
  });

  $(".total").click(function(t) {
    $("#inputForm").hide();
    $("#most-blomoed").hide();
    $("#most-visited").hide();
    setTimeout(function() {
      $("#total-blomoed").show();
    }, 100);
  });  

  $("#blomoAgain").click(function(e) {
    $("#inputForm").show();   
  });


});

