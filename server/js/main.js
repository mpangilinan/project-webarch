var longURL = "";
var shortURL = "";

$(function() {

    // hide the confirmation webapge from view
  $("#confirmation").hide();

  // ---- event handler ---- //
  $("#submit").click(function(e) {
    console.log("Do I ever get here?");
    longURL = $("#long-URL").val();
    shortURL = $("#short-URL").val();
    console.log("Long URL is: " + longURL);
    console.log("Short URL is: " + shortURL);
  });
    

});