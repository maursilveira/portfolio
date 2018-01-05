(function() {
  'use strict';

  const MIN = 320;
  const MEDIUM = 640;
  const LARGE = 1024;
  var screensize;
  var bodyarea = document.querySelector('body');
  var lightbox = document.querySelector('#lightbox');
  var banner = document.querySelector('#main-banner');
  var header = banner.querySelector('header');
  var logo = header.querySelector('#main-logo');
  var hambmenu = header.querySelector('#hamburger-menu');
  var menu = header.querySelector('#main-nav');
  var menubtns = menu.querySelectorAll('a');
  var projectRequest;
  var detailRequest;
  var imageRequest;
  var curPhoto = 0;
  // var projectcont = document.querySelector('#projects');

  var menuOpen = false;

  var galleryTl = new TimelineLite();

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

  // function changeBanner() {
  //   console.log('changeBanner');
  //   var bannerimg = document.querySelector('#main-banner > img');
  //   bannerimg.src = 'images/statue.jpg';
  // }

  function showProjects() {
    // console.log(this);
    projectRequest = createRequest();
  	if (!projectRequest) {
  		alert('Browser does not support AJAX');
  		return;
  	}
  	var url = 'includes/projects.php';
  	projectRequest.onreadystatechange = getProjects;
  	projectRequest.open('GET', url, true);
  	projectRequest.send(null);
  }

  function getProjects() {
  	if (projectRequest.readyState === 4 || projectRequest.readyState === 'complete') {
  		var result = JSON.parse(projectRequest.responseText);
      var projectcont = document.querySelector('#projects');
      result.forEach(function(project) {
        let item = document.createElement('li');
        item.className = 'project-item';
        let link = document.createElement('a');
        link.href = "#";
        let image = document.createElement('img');
        image.src = 'images/'+project.cover;
        image.alt = project.name;
        image.dataset.id = project.id;
        let name = document.createElement('h3');
        name.innerHTML = project.name;
        link.appendChild(image);
        link.appendChild(name);
        item.appendChild(link);
        projectcont.appendChild(item);
        item.addEventListener('click', openProjectLightbox, false);
      });
  	}
  }

  function openProjectLightbox(evt) {
    evt.preventDefault();
    var id = evt.currentTarget.querySelector('img').getAttribute('data-id');
    imageRequest = createRequest();
  	if (!imageRequest) {
  		alert('Browser does not support AJAX');
  		return;
  	}
  	var url = 'includes/projects.php?id=' + id;
  	imageRequest.onreadystatechange = getImage;
  	imageRequest.open('GET', url, true);
  	imageRequest.send(null);
  }

  function getImage() {
  	if (imageRequest.readyState === 4 || imageRequest.readyState === 'complete') {
  		var result = JSON.parse(imageRequest.responseText);
      var content = lightbox.querySelector('#lb-content');
      var title = content.querySelector('#project-name');
      var desc = content.querySelector('#project-desc');
      var wrapper = content.querySelector('#image-wrapper');
      var close = content.querySelector('#lb-close');
      var left = content.querySelector('#lb-left');
      var right = content.querySelector('#lb-right');

      result.forEach(function(file) {
        let image = document.createElement('img');
        image.src = 'images/'+file.path;
        wrapper.appendChild(image);
      });
      title.innerHTML = result[0].name;
      desc.innerHTML = result[0].description;
      curPhoto = 0;
      lightbox.style.display = 'block';

      close.removeEventListener('click', closeLightbox, false);
      left.removeEventListener('click', previousPhoto, false);
      right.removeEventListener('click', nextPhoto, false);
      close.addEventListener('click', closeLightbox, false);
      left.addEventListener('click', previousPhoto, false);
      right.addEventListener('click', nextPhoto, false);

      // document.querySelector('#container').classList.add('noscroll');
      // let offsets = bodyarea.getBoundingClientRect();
      bodyarea.classList.add('noscroll');
      // bodyarea.style.top = offsets.y + 'px';
  	}
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    bodyarea.classList.remove('noscroll');
  }

  function previousPhoto() {
    var wrapper = lightbox.querySelector('#image-wrapper');
    var width = wrapper.offsetWidth;
    var photos = wrapper.querySelectorAll('img');
    // console.log(width);
    // wrapper.style.left = wrapper.style.left + width;
    if (!galleryTl.isActive()) {
      if (curPhoto === 0) {
        console.log('first photo, go to last one');
        galleryTl.to(wrapper, 0.5, {left: '-' + width*(photos.length-1) + 'px'});
        curPhoto = photos.length - 1;
      }
      else {
        console.log('go to previous one');
        galleryTl.to(wrapper, 0.5, {left: '-' + width*(curPhoto-1) + 'px'});
        curPhoto = curPhoto - 1;
      }
    }
  }

  function nextPhoto() {
    var wrapper = lightbox.querySelector('#image-wrapper');
    var width = wrapper.offsetWidth;
    var photos = wrapper.querySelectorAll('img');
    console.log(width);
    console.log(curPhoto);
    // console.log(wrapper.style.left);
    // wrapper.style.left = wrapper.style.left - width;
    if (!galleryTl.isActive()) {
      if (curPhoto === photos.length-1) {
        console.log('last photo, go to first one');
        galleryTl.to(wrapper, 0.5, {left: 0});
        curPhoto = 0;
      }
      else {
        console.log('go to next one');
        galleryTl.to(wrapper, 0.5, {left: '-' + width*(curPhoto+1) + 'px'});
        curPhoto = curPhoto + 1;
      }
    }
  }

  checkScreenSize.call(window.innerWidth);
  showProjects.call(document.querySelector('#projects'));

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
