$(document).ready(function() {
     
      // When user has been on the site for 3 seconds, deploy popover. //
      // Source: http://dev.vast.com/jquery-popup-overlay/ //
      // This jQuery plugin is accessible by default. //
      console.log(localStorage);
      var restrictpopup = false

      if (restrictpopup === false) {
          // Initialize plugin with transition.
          $('#my_popup').popup({transition: 'all 1s'}); 
          // Prevent flashing of popup on page load.
          $('#my_popup').popup('hide');
          $('#my_popup').removeClass('hidden');
          setTimeout(function() {
              $('#my_popup').popup('show'); 
              $('#parallax-chisel').removeClass('hidden');
              $('#parallax-shavings').removeClass('hidden');
          }, 3000);
          restrictpopup = true
          localStorage.restrictpopup;
      }

    /* If user closes the popover, do not deploy on subsequent reloads/pageviews. */
    $(".close-button").click(function() {
        $('#my_popup').popup('hide');
        $('#parallax-chisel').addClass('hidden');
        $('#parallax-shavings').addClass('hidden');
        console.log(localStorage);
    });

    // Parallax Chisel //
    // Source: http://www.javascriptkit.com/dhtmltutors/parallaxscrolling/ //
    
    var chisel = document.getElementById('parallax-chisel')
    var shavings = document.getElementById('parallax-shavings')
    
    function parallaxchiselshavings(){
        var scrolltop = $("#my_popup_wrapper")[0].scrollTop // get number of pixels document has scrolled vertically 
        chisel.style.top = 400 -scrolltop * .25 + 'px' // move chisel at 25% of scroll rate
        shavings.style.top = 180 -scrolltop * .10 + 'px' // move shavings at 10% of scroll rate
    }

    $( "#my_popup_wrapper" ).scroll(function() {
        parallaxchiselshavings();
    });
  
});
