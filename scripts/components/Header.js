export default class Header {
  constructor(element) {
    this.element = element;
    this.options = {
      treshold: 0.3,
    };
    this.scrollPosition = 0;
    this.lastScrollPosition = 0;
    this.html = document.documentElement;
    this.init();
    this.initNavMobile();
  }

  init() {
    this.setOptions();
  }

  setOptions() {
    // check different data attributes on the component / verifier les differents attributs data sur la composante
    if ('autoHide' in this.element.dataset) {
      window.addEventListener('scroll', this.onScroll.bind(this));
    }
  }

  onScroll() {
    this.lastScrollPosition = this.scrollPosition;
    this.scrollPosition = document.scrollingElement.scrollTop;

    this.setHeaderState();
    this.setDirections();
  }
  setHeaderState() {
    if (
      this.scrollPosition >
      document.scrollingElement.scrollHeight * this.element.dataset.treshold
    ) {
      this.html.classList.add('header-is-hidden');
    } else {
      this.html.classList.remove('header-is-hidden');
    }
  }

  setDirections() {
    if (this.scrollPosition >= this.lastScrollPosition) {
      // scroll towards the bottom / scroll vers le bas
      this.html.classList.add('is-scrolling-down');
      this.html.classList.remove('is-scrolling-up');
    } else {
      //scroll towards the top / scroll vers le haut
      this.html.classList.add('is-scrolling-up');
      this.html.classList.remove('is-scrolling-down');
    }
  }

  initNavMobile() {
    // add a class to switch in between desktop and mobile menu / ajoute une classe pour changer entre le menu desktop et mobile
    const toggle = this.element.querySelector('.js-toggle');
    // make the button clickable / rendre le bouton cliquable
    toggle.addEventListener('click', this.onToggleNav.bind(this));
  }

  onToggleNav() {
    this.html.classList.toggle('nav-is-active');
  }
}
