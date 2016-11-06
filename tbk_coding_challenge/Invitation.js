/* When user has been on the site for 3 seconds, deploy popover. */
setTimeout(function() {
    console.log("setTimeOut works for this challenge.");
    /* Test popover. */
    // $("#demo01").animatedModal();
}, 2000);


/* If user closes the popover, do not deploy on subsequent reloads/pageviews. */
$(".close-button").click(function() {
    console.log("Close button was clicked.")
});

/* Accessility */
