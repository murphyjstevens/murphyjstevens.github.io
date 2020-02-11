(function($) { // Begin jQuery
  $(function() { // DOM ready
    var mobilePanel = document.querySelector('.mobile-nav');
    var mobileLinks = Array.from(mobilePanel.querySelectorAll('a[href^="#"]:not(.manual-optin-trigger)'));
    var header = document.querySelector('.header');
    var trigger = document.querySelector('.mobile-trigger');
    var logoTrigger = document.querySelector('.logo-trigger');

    // Check to see if menu is open
    var isOpen = function isOpen() {
        return mobilePanel.classList.contains('mobile-nav--open');
    };

    // Open the nav
    var open = function open() {
        // Get header height
        var headerHeight = header.offsetHeight;
        // Set top style to help slide down
        mobilePanel.style.top = headerHeight + 'px';
        // Add classes for icon and slide-in
        mobilePanel.classList.add('mobile-nav--open');
        header.classList.add('mobile-is-open');
        // Add listener to close on click
        mobileLinks.forEach(function (el) {
            el.addEventListener('click', close);
        });
    };

    // Close the nav
    var close = function close() {
      // Remove the top style
      mobilePanel.style.top = '';
      // Remove classes for icon and slide-in
      mobilePanel.classList.remove('mobile-nav--open');
      header.classList.remove('mobile-is-open');
      // Remove listener to close on click
      mobileLinks.forEach(function (el) {
        el.removeEventListener('click', close);
      });
    };

    trigger.addEventListener('click', function () {
      isOpen() ? close() : open();
    });

    logoTrigger.addEventListener('click', function () {
      if (isOpen()) {
        close();
      }
    });

    // Select all links with hashes
  $('a[href*="#"]')
    // Remove links that don't actually link to anything
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function(event) {
      // On-page links
      if (
        location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '')
        &&
        location.hostname == this.hostname
      ) {
        // Figure out element to scroll to
        var target = $(this.hash);
        target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
        // Does a scroll target exist?
        if (target.length) {
          // Only prevent default if animation is actually gonna happen
          event.preventDefault();
          $('html, body').animate({
            scrollTop: target.offset().top
          }, 500, function() {
            // Callback after animation
            // Must change focus!
            var $target = $(target);
            $target.focus();
            if ($target.is(":focus")) { // Checking if the target was focused
              return false;
            } else {
              $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
              $target.focus(); // Set focus again
            };
          });
        }
      }
    });
  }); // end DOM ready
})(jQuery); // end jQuery
