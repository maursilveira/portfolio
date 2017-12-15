(function() {
  "use strict";

  var text = document.querySelector('#text-click');

  function changeBanner() {
    console.log('changeBanner');
    var bannerimg = document.querySelector('#main-banner > img');
    bannerimg.src = 'images/statue.jpg';
  }

  text.addEventListener('click', changeBanner, false);
})();
