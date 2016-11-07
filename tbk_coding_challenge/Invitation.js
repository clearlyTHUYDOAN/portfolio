$(document).ready(function() {
     
      // When user has been on the site for 3 seconds, deploy popover. //
      // This jQuery plugin is accessible by default. //
      
      // Initialize plugin.
      $('#my_popup').popup(); 
      // Prevent flashing of popup on page load.
      $('#my_popup').popup('hide');
      $('#my_popup').removeClass('hidden');
      setTimeout(function() {
          $('#my_popup').popup('show'); 
      }, 0);

      // Source: http://dev.vast.com/jquery-popup-overlay/ //

    /* If user closes the popover, do not deploy on subsequent reloads/pageviews. */
    $(".close-button").click(function() {
        $('#my_popup').popup('hide');
    });

});
