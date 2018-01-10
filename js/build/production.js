// JavaScript Document

//utility function to create AJAX request/XHR object

function createRequest() {
	var request;

	try {
		request = new XMLHttpRequest();
	  } catch(e) {
		try {
		  request = new ActiveXObject("Msxml2.XMLHTTP");
		} catch(e) {
			try {
		 		request = new ActiveXObject("Microsoft.XMLHTTP");
			} 	catch(e) {
			request = null;
		}
	}
}
	return request;
}

(function() {
  'use strict';

  const MIN = 320;
  const MEDIUM = 640;
  const LARGE = 1024;
  const XLARGE = 1440;
  var screensize;
  var bodyarea = document.querySelector('body');
  var lightbox = document.querySelector('#lightbox');
  var wrapper = lightbox.querySelector('#image-wrapper');
  var banner = document.querySelector('#main-banner');
  var header = banner.querySelector('header');
  var logo = header.querySelector('#main-logo');
  var hambmenu = header.querySelector('#hamburger-menu');
  var menu = header.querySelector('#main-nav');
  var menubtns = menu.querySelectorAll('a');
  var motto = document.querySelector('#motto');
  var projectRequest;
  var detailRequest;
  var imageRequest;
  var curPhoto = 0;
  var curSize = 'small';
  var menuOpen = false;
  var mottoAnimated = false;

  var galleryTl = new TimelineLite();

  function checkScreenSize() {
    if(this < MEDIUM || window.innerWidth < MEDIUM) {
      screensize = 'small';
    }
    else if(this < LARGE || window.innerWidth < LARGE) {
      screensize = 'medium';
    }
    else if(this < XLARGE || window.innerWidth < XLARGE) {
      screensize = 'large';
    }
    else {
      screensize = 'xlarge';
    }
  }

  function isElementInViewport(el) {
    let rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight+100 || document.documentElement.clientHeight+100) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  //set images size (small, medium or large) on load
  function setImageSize() {
    for (let i = 0; i < this.length; i++) {
      this[i].src = this[i].src.replace('small', screensize);
    }
    curSize = screensize;
  }

  // change images and videos size (small, medium or large) on screen resize
  function changeImageSize() {
    if (curSize !== screensize) {
      var img = document.querySelectorAll('.media-change');
      for (let i = 0; i < img.length; i++) {
        img[i].src = img[i].src.replace(curSize, screensize);
      }
      curSize = screensize;
      // console.log(curSize);
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
    if (offsets.top <= pos) {
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
      if (offsets.top <= pos) {
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
        if (!("ontouchstart" in document.documentElement)) {
          item.classList.add('no-touch');
        }
        item.addEventListener('click', openProjectLightbox, false);
      });
  	}
  }

  function openProjectLightbox(evt) {
    evt.preventDefault();
    // console.log(curPhoto);
    while(wrapper.firstChild) {
      wrapper.removeChild(wrapper.firstChild);
    }
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
      var desc = content.querySelector('#project-desc > p');
      // var wrapper = content.querySelector('#image-wrapper');
      var close = content.querySelector('#lb-close');
      var left = content.querySelector('#lb-left');
      var right = content.querySelector('#lb-right');

      result.forEach(function(file) {
        let image = document.createElement('img');
        image.classList.add('media-change');
        image.src = 'images/'+file.file+'_'+screensize+'.'+file.extension;
        // image.src = 'images/'+file.file+'_large.'+file.extension;
        wrapper.appendChild(image);
      });
      title.innerHTML = result[0].name;
      desc.innerHTML = result[0].description;
      curPhoto = 0;
      lightbox.style.display = 'block';

      lightbox.removeEventListener('click', closeLightbox, false);
      close.removeEventListener('click', closeLightbox, false);
      left.removeEventListener('click', previousPhoto, false);
      right.removeEventListener('click', nextPhoto, false);
      wrapper.removeEventListener('click', nextPhoto, false);
      lightbox.addEventListener('click', closeLightbox, false);
      close.addEventListener('click', closeLightbox, false);
      left.addEventListener('click', previousPhoto, false);
      right.addEventListener('click', nextPhoto, false);
      wrapper.addEventListener('click', nextPhoto, false);
      title.addEventListener('click', function(evt){evt.stopPropagation();});
      desc.addEventListener('click', function(evt){evt.stopPropagation();});

      // document.querySelector('#container').classList.add('noscroll');
      // let offsets = bodyarea.getBoundingClientRect();
      bodyarea.classList.add('noscroll');
  	}
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
    bodyarea.classList.remove('noscroll');
    curPhoto = 0;
    TweenMax.to(wrapper, 0, {left: 0});
  }

  function previousPhoto(evt) {
    evt.stopPropagation();
    // var wrapper = lightbox.querySelector('#image-wrapper');
    var width = wrapper.offsetWidth;
    var photos = wrapper.querySelectorAll('img');
    // console.log(width);
    // wrapper.style.left = wrapper.style.left + width;
    if (!galleryTl.isActive()) {
      if (curPhoto === 0) {
        // console.log('first photo, go to last one');
        galleryTl.to(wrapper, 0.5, {left: '-' + width*(photos.length-1) + 'px'});
        curPhoto = photos.length - 1;
      }
      else {
        // console.log('go to previous one');
        galleryTl.to(wrapper, 0.5, {left: '-' + width*(curPhoto-1) + 'px'});
        curPhoto = curPhoto - 1;
      }
    }
  }

  function nextPhoto(evt) {
    evt.stopPropagation();
    // var wrapper = lightbox.querySelector('#image-wrapper');
    var width = wrapper.offsetWidth;
    var photos = wrapper.querySelectorAll('img');
    // console.log(width);
    // console.log(curPhoto);
    // console.log(wrapper.style.left);
    // wrapper.style.left = wrapper.style.left - width;
    if (!galleryTl.isActive()) {
      if (curPhoto === photos.length-1) {
        // console.log('last photo, go to first one');
        galleryTl.to(wrapper, 0.5, {left: 0});
        curPhoto = 0;
      }
      else {
        // console.log('go to next one');
        galleryTl.to(wrapper, 0.5, {left: '-' + width*(curPhoto+1) + 'px'});
        curPhoto = curPhoto + 1;
      }
    }
  }

  function animateMotto() {
    if(isElementInViewport(motto)) {
      if (!mottoAnimated) {
        TweenMax.to(motto, 1, {paddingTop: 0, opacity: 1});
        mottoAnimated = true;
      }
    }
  }

  checkScreenSize.call(window.innerWidth);
  showProjects.call(document.querySelector('#projects'));
  setImageSize.call(document.querySelectorAll('.media-change'));

  window.addEventListener('resize', checkScreenSize, false);
  window.addEventListener('resize', changeImageSize, false);
  window.addEventListener('scroll', fixHeaderOnTop, false);
  // window.addEventListener('scroll', animateMotto, false);
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
