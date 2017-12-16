(function() {
  "use strict";

  // var text = document.querySelector('#text-click');

  function checkScrollHeader() {
    var header = document.querySelector('header');
    var banner = document.querySelector('#main-banner');
    //diference from banner height to header height to get position on screen to fire
    //it is negative because scrolling up makes y and top properties of offsets negative
    var pos = -Math.abs(banner.offsetHeight - header.offsetHeight);
    //get position of banner on screen
    var offsets = banner.getBoundingClientRect();

    //check if position y of banner is smaller or equal to position of header on screen
    //if true, add class 'ontop' to header
    //if false, remove class 'ontop' from header
    if (offsets.y <= pos) {
      header.classList.add('ontop');
    }
    else {
      header.classList.remove('ontop');
    }
  }

  function changeBanner() {
    console.log('changeBanner');
    var bannerimg = document.querySelector('#main-banner > img');
    bannerimg.src = 'images/statue.jpg';
  }

  window.addEventListener('scroll', checkScrollHeader, false);
})();
