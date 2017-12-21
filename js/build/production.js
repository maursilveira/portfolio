(function() {
  'use strict';

  const MIN = 320;
  const MEDIUM = 640;
  const LARGE = 1024;
  var screensize;
  var banner = document.querySelector('#main-banner');
  var header = banner.querySelector('header');
  var logo = header.querySelector('#main-logo');
  var hambmenu = header.querySelector('#hamburger-menu');
  var menu = header.querySelector('#main-nav');
  var menubtns = menu.querySelectorAll('a');

  var menuOpen = false;

  // var menuTl = new TimelineLite({
  //   paused: true
  // });

  function checkScreenSize() {
    if(this < MEDIUM || window.innerWidth < MEDIUM) {
      screensize = 'small';
    }
    else if(this < LARGE || window.innerWidth < LARGE) {
      screensize = 'medium';
    }
    else {
      screensize = 'large';
    }
  }

  //make header fixed when reaching top of screen on scroll
  //release it when scrolling up back
  function fixHeaderOnTop() {
    if(menuOpen === true) {
      menuAnimation();
    }
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

  // function to scroll to selected area when menu clicked
  function scrollSection(evt) {
    evt.preventDefault();
    if (menuOpen === true) {
      menuAnimation();
    }
    var bodyarea = document.querySelector('body');
    var worksec = bodyarea.querySelector('#work');
    var aboutsec = bodyarea.querySelector('#about');
    var contactsec = bodyarea.querySelector('#contact');

    switch(this.id) {
      case 'main-logo':
        bodyarea.scrollIntoView({block: 'start', inline: 'start', behavior: 'smooth'});
        break;
      case 'menu-work':
        worksec.scrollIntoView({block: 'start', inline: 'start', behavior: 'smooth'});
        break;
      case 'menu-about':
        aboutsec.scrollIntoView({block: 'start', inline: 'start', behavior: 'smooth'});
        break;
      case 'menu-contact':
        contactsec.scrollIntoView({block: 'start', inline: 'start', behavior: 'smooth'});
        break;
      default:
        break;
    }
  }

  function menuAnimation() {
    if (!menuOpen) {
      var pos = -Math.abs(banner.offsetHeight - header.offsetHeight)/2
      var offsets = banner.getBoundingClientRect();
      menuOpen = true;
      hambmenu.classList.remove('ion-navicon');
      hambmenu.classList.add('ion-android-close');
      header.classList.add('openmenu');
      if (offsets.y <= pos) {
          menu.classList.add('down');
      }
    }
    else {
      menuOpen = false;
      // menuTl.reverse();
      header.classList.remove('openmenu');
      hambmenu.classList.remove('ion-android-close');
      hambmenu.classList.add('ion-navicon');
      menu.classList.remove('down');
    }
  }

  // function selectMenuOption(evt) {
  //   evt.target.parentNode.classList.add('selected');
  // }
  //
  // function deselectMenuOption() {
  //   menu.querySelectorAll('li').forEach(function(el) {
  //     el.classList.remove('selected');
  //   });
  // }

  // function openMenu() {
  //   menuTl.to(menu, 1, {left: 0, opacity: 1, ease: Expo.easeInOut});
  // }

  // function changeNavPosition() {
  //   // var pos = -Math.abs(banner.offsetHeight - header.offsetHeight)/2;
  //   var pos = -Math.abs(banner.offsetHeight)/4;
  //   var offsets = banner.getBoundingClientRect();
  //
  //   if (offsets.y <= pos) {
  //     header.classList.add('invert');
  //   }
  //   else {
  //     header.classList.remove('invert');
  //   }
  // }

  // function changeBanner() {
  //   console.log('changeBanner');
  //   var bannerimg = document.querySelector('#main-banner > img');
  //   bannerimg.src = 'images/statue.jpg';
  // }

  checkScreenSize.call(window.innerWidth);

  window.addEventListener('resize', checkScreenSize, false);
  window.addEventListener('scroll', fixHeaderOnTop, false);
  // window.addEventListener('scroll', changeNavPosition, false);
  menubtns.forEach(function(button) {
    // button.addEventListener('mouseover', selectMenuOption, false);
    // button.addEventListener('mouseout', deselectMenuOption, false);
    button.addEventListener('click', scrollSection, false);
  });
  logo.addEventListener('click', scrollSection, false);
  hambmenu.addEventListener('click', menuAnimation, false);
  // for (let i = 0; i < menubtn.length; i++) {
  //   menubtn[i].addEventListener('click', scrollSection, false);
  // }
})();
