$(document).ready(function() {
     
      // When user has been on the site for 3 seconds, deploy popover. //
      // This jQuery plugin is accessible by default. //
    //   setTimeout(function() {
    //       $('#my_popup').popup('show'); 
    //       console.log("setTimeOut works.");
    //   }, 3000);

      // Source: http://dev.vast.com/jquery-popup-overlay/ //

    /* If user closes the popover, do not deploy on subsequent reloads/pageviews. */
    $(".close-button").click(function() {
        $('#my_popup').popup('hide');
    });

});
