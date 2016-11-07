$(document).ready(function() {
     
      // DEPLOY POPOVER. //
      // Reference: http://dev.vast.com/jquery-popup-overlay/ 
      // This jQuery plugin is accessible by default. 

      // Check localStorage to determine if popover deploys. 
      var restrictpopup = false;
      if (localStorage.restrictpopup) {
          restrictpopup = localStorage.restrictpopup;
      };

      if (restrictpopup === false) {
          // Initialize plugin with transition and onclose specifications.
          $("#my_popup").popup({
              transition: "all 1s",
              onclose: () => {
                  $("#parallax-chisel").addClass("hidden");
                  $("#parallax-shavings").addClass("hidden");
              }
          }); 

          // When user has been on the site for 3 seconds, deploy popover. 
          setTimeout(function() {
              $("#my_popup").popup("show"); 
              $("#parallax-chisel").removeClass("hidden");
              $("#parallax-shavings").removeClass("hidden");
          }, 3000);
          restrictpopup = true;
          localStorage.restrictpopup="true";
      };

    // Hide popup when close button is clicked. Can also be closed using ESC and clicking outside popup. 
    $(".close-button").click(function() {
        $("#my_popup").popup("hide");
        $("#parallax-chisel").addClass("hidden");
        $("#parallax-shavings").addClass("hidden");
    });

    // PARALLAX FOR CHISEL AND SHAVINGS. //
    // Reference: http://www.javascriptkit.com/dhtmltutors/parallaxscrolling/ 
    
    var chisel = document.getElementById("parallax-chisel");
    var shavings = document.getElementById("parallax-shavings");
    
    function parallaxchiselshavings(){
        var scrolltop = $("#my_popup_wrapper")[0].scrollTop; // get number of pixels document has scrolled vertically 
        chisel.style.top = 400 -scrolltop * .10 + "px" // move chisel at 10% of scroll rate
        shavings.style.top = 190 -scrolltop * .25 + "px" // move shavings at 25% of scroll rate
    };

    $("#my_popup_wrapper").scroll(function() { // when scrolling within this element...
        parallaxchiselshavings(); // ... run this function.
    });
  
});
