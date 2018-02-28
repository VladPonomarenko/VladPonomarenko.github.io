
// -hamburger

var menuList = [
    {
        name: 'о нас',
        href: '#second-section'
    },
    {
        name: 'бургеры',
        href: '#third-section'
    },
    {
        name: 'команда',
        href: '#fourth-section'
    },
    {
        name: 'меню',
        href: '#fifth-section'
    },
    {
        name: 'отзывы',
        href: '#sixth-section'
    },
    {
        name: 'контакты',
        href: '#eighth-section'
    }
];


const body = document.body;
const button = document.querySelector('#hamburger');
const overlay = createOverlay(menuList);

body.appendChild(overlay);

button.addEventListener('click', function(e){
    e.preventDefault();
    overlay.style.display = 'flex';
    body.style.overflow = 'hidden';
});


function createOverlay(list) {
    let logo = document.querySelector('#logo').cloneNode(true);
    logo.classList.add('overlay__logo');

    let closeBtn = document.createElement('a');
    closeBtn.classList.add('close-btn');
    closeBtn.href = '#';
    closeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        overlay.style.display = 'none';
        body.style.overflow = 'initial';
    });

    let header = document.createElement('div');
    header.classList.add('overlay__header');

    let overlay = document.createElement('div');
    overlay.classList.add('overlay');
    
    let menu = document.createElement('ul');
    menu.classList.add('overlay__list');

    for (i = 0; i < list.length; i++) {

        const link = document.createElement('a');
        link.classList.add('overlay__link');
        link.classList.add('nav-btn');
        link.href = list[i].href;
        link.textContent = list[i].name;
        link.addEventListener('click', function(e) {
            e.preventDefault();
            overlay.style.display = 'none';
            body.style.overflow = 'initial';
        });

        const item = document.createElement('li');
        item.classList.add('overlay__item');
        item.appendChild(link);
        menu.appendChild(item);

    }

    header.appendChild(logo);
    header.appendChild(closeBtn);
    overlay.appendChild(header);
    overlay.appendChild(menu);

    return overlay;

}

// - accordions

const teamItems = document.querySelector('#team-menu').querySelectorAll('.fourth__item');
const burgersItems = document.querySelector('#burgers-menu').querySelectorAll('.fifth__link');

createAccordionMenu(teamItems, 'fourth__item--active');
createAccordionMenu(burgersItems, 'fifth__link--active');

function createAccordionMenu(menuList, activeClassList) {
  menuList.forEach((item) => {
    item.addEventListener('click', (e) =>{
      e.preventDefault();
      menuList.forEach((item) => {
         if (e.currentTarget != item) {
          item.classList.remove(activeClassList);
         }
        });
      item.classList.toggle(activeClassList);
      });  
  });
}

// rewievs overlay

const reviewsList = document.querySelector('#reviews-list');
const reviewsBtns = reviewsList.querySelectorAll('.sixth__inner-link');
const reviewsOverlay = createReviewsOverlay();
const reviewsOverlayBtn = reviewsOverlay.querySelector('#reviews-overlay-btn');

reviewsBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    let text = e.target.parentNode.querySelector('.sixth__inner-text').innerText;
    let title = e.target.parentNode.querySelector('.sixth__inner-title').innerText;
    e.preventDefault();
    body.style.overflow = 'hidden';
    reviewsOverlay.querySelector('.overlay__title').innerText = title;
    reviewsOverlay.querySelector('.overlay__text').innerText = text;
    body.appendChild(reviewsOverlay);
  });
});

reviewsOverlayBtn.addEventListener('click', (e) => {
  e.preventDefault();
  body.style.overflow = 'initial';
  body.removeChild(reviewsOverlay);
});


function createReviewsOverlay() {
  let overlay =  document.createElement('div');
  overlay.innerHTML = document.querySelector('#reviews-overlay').innerHTML;
  overlay.classList.add('overlay');
  overlay.classList.add('overlay--rewievs');

  return overlay;
}


// one page scroll

const onPageScrollWrapper = document.querySelector('#wrapper-scroll');
const onePageScrollAnimationDuration = 900;
const sectionsArray = onPageScrollWrapper.querySelectorAll('section');
const section = onPageScrollWrapper.querySelector('section');
const sectionStep = parseInt(getComputedStyle(section).height);
const sectionsArrayLength = sectionsArray.length - 1;
var isBeingAnimated = false;

document.addEventListener("wheel", (e) =>{
  
  if (!isBeingAnimated) {
    let curentParams = getCurentParamsToScroll(section, 'height', onPageScrollWrapper, 'top');
    let max = sectionsArrayLength * curentParams.sliderStep;

    if ((e.deltaY > 0)&&(Math.abs(curentParams.curentPosition) < max)) {
      isBeingAnimated = true;
      setActiveItemInNavMenu(curentParams.curentPosition - curentParams.sliderStep, curentParams.sliderStep);
      animateProp(onPageScrollWrapper, 'top', curentParams.curentPosition, curentParams.curentPosition - curentParams.sliderStep, onePageScrollAnimationDuration);
    }
    if ((e.deltaY < 0)&&(Math.abs(curentParams.curentPosition) > 0)) {
      isBeingAnimated = true;
      setActiveItemInNavMenu(curentParams.curentPosition + curentParams.sliderStep, curentParams.sliderStep);
      animateProp(onPageScrollWrapper, 'top', curentParams.curentPosition, curentParams.curentPosition + curentParams.sliderStep, onePageScrollAnimationDuration);
    }
  }
});

function getCurentParamsToScroll(item, itemProp, slider, sliderProp) {
  let itemSize = Math.abs(parseInt(getComputedStyle(item)[itemProp]));
  let curent = checkSliderPosition(parseInt(getComputedStyle(slider)[sliderProp]), sliderProp, itemSize, slider);
  
  return {
    curentPosition: curent,
    sliderStep: itemSize,
  };

  function checkSliderPosition(curentPosition, sliderProp, step, slider) {
    let checkVal = curentPosition % step;
    if (checkVal != 0) {
      let newPosition = (parseInt(curentPosition/step) ) * step;
      return newPosition;
    }  
    return curentPosition;
  }
}

function animateProp(elem, prop, from, to, duration) {
  return new Promise((resolve) => {
    function animation() {
      const currentTime = Date.now();
      const timesLeft = startTime + duration - currentTime;

      if (timesLeft <= 0) {
        elem.style[prop] = to + 'px';
        isBeingAnimated = false;
        resolve();
      } else {
        const progress = 1/duration * (duration - timesLeft);
        elem.style[prop] = from + (to - from) * progress + 'px';
        requestAnimationFrame(animation);
      }
    }

    const startTime = Date.now();
    requestAnimationFrame(animation);

  });
}

// navigation menu

const navBtns = document.querySelectorAll('.nav-btn');
const asideNavigation = document.querySelectorAll('.navigation__link');

navBtns.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    let target = document.querySelector(btn.hash);
    let curentParams = getCurentParamsToScroll(section, 'height', onPageScrollWrapper, 'top');
    let targetPosition = -target.offsetTop;
    if (e.currentTarget.classList.contains('navigation__link')) {
      asideNavigation.forEach((btn) => {
        btn.parentNode.classList.remove('navigation__item--active');
      });
      e.currentTarget.parentNode.classList.add('navigation__item--active');
    } else {
      setActiveItemInNavMenu(targetPosition, curentParams.sliderStep);
    }
    isBeingAnimated = true;
    animateProp(onPageScrollWrapper, 'top', curentParams.curentPosition, targetPosition, onePageScrollAnimationDuration);
  });
});

function setActiveItemInNavMenu(targetPosition, step) {
  let activ = Math.abs(parseInt(targetPosition/step));
  asideNavigation.forEach((btn) => {
    btn.parentNode.classList.remove('navigation__item--active');
  });
  asideNavigation[activ].parentNode.classList.add('navigation__item--active');
};

// -slider

const slider = document.querySelector('#slider-list');
const sliderItems = slider.querySelectorAll('li');
const sliderItemsNumber = sliderItems.length;
const sliderItem = slider.querySelector('li');
const sliderLeftBtn = document.querySelector('#slider-left');
const sliderRightBtn = document.querySelector('#slider-right');
const sliderMinPosition = 0;

sliderLeftBtn.addEventListener('click', (e) =>{
  e.preventDefault();
  let params = getSliderSize(sliderItem, slider);
  if (params.curentPosition > 0) {
    setSliderPosition(params.curentPosition, -(params.step));
  } else {
    setSliderPosition(params.maxPosition, 0);
  }
});

sliderRightBtn.addEventListener('click', (e) =>{
  e.preventDefault();
  let params = getSliderSize(sliderItem, slider);
  if (params.curentPosition < params.maxPosition) {
    setSliderPosition(params.curentPosition, params.step);
  } else {
    setSliderPosition(0, 0);
  }
});

function getSliderSize(item, slider) {
  let step = parseInt(getComputedStyle(item).width);
  let curent = checkSliderPosition(parseInt(getComputedStyle(slider).right), step);
  let max = parseInt(getComputedStyle(slider).width) - step;
  
  return {
    curentPosition: curent,
    step: step,
    maxPosition: max
  };
}

function setSliderPosition(curentPosition, step) {
  slider.style.right = curentPosition + step + 'px';
}

function checkSliderPosition(curentPosition, step) {
  let checkVal = curentPosition % step;
  if (checkVal != 0) {
    slider.style.right = 0;
    return 0;
  }  
  return curentPosition;
}

// form sender

var orderForm = document.querySelector('#order-form');
    orderOverlay = document.createElement('div');
    orderOverlay.innerHTML = document.querySelector('#order-overlay').innerHTML;
    orderOverlay.classList.add('overlay');
    orderOverlay.classList.add('overlay--rewievs');
var orderCloseBtn = orderOverlay.querySelector('#order-close-btn');

orderCloseBtn.addEventListener('click', (e) => {
  e.preventDefault();
  body.removeChild(orderOverlay);
});

orderForm.addEventListener('submit', (e) =>{
  e.preventDefault();
  createReq(orderForm).then(
    (mes) => {
      createOrderModalWindow(body, orderOverlay, mes);
    },
    (error) =>{
      createOrderModalWindow(body, orderOverlay, error);
    }
  );
});

function createReq(form) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest(),
        method = form.method,
        url = form.action,
        data = new FormData(form);

    xhr.open(method, url, true);
    xhr.send(data);
    
    xhr.onerror = (error) =>{
      reject(error);
    }

    xhr.onreadystatechange = () =>{
      if (xhr.readyState != 4) return;
      
      if (xhr.responseText == 'OK') {
        resolve(xhr.responseText);
      }else{
        reject(xhr.responseText);
      }
    }

  });
}

function createOrderModalWindow(parent, child, text) {
  if (!text) {
    text = 'no response';
  }
  child.querySelector('.order-modal__text').innerText = text;
  parent.appendChild(child);
}

