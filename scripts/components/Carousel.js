import Swiper from 'swiper/bundle';
export default class Carousel {
  constructor(element) {
    this.element = element;

    this.options = {
      slidesPerView: 1,
      spaceBetween: 20,
      pagination: {
        el: this.element.querySelector('.swiper-pagination'),
        clickable: true,
      },
      navigation: {
        nextEl: this.element.querySelector('.swiper-button-next'),
        prevEl: this.element.querySelector('.swiper-button-prev'),
      },
    };
    this.init();
  }
  init() {
    this.setOptions();
    new Swiper(this.element, this.options);
  }
  setOptions() {
    const full = this.element.querySelector('.swiper-full');
    if (full) {
      full.style.setProperty = ('overflow', 'visible');
    }
    if ('split' in this.element.dataset) {
      this.options.breakpoints = {
        768: {
          slidesPerView: 2.5,
        },
      };
    }
    if ('autoplay' in this.element.dataset) {
      this.options.autoplay = {
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: false,
      };
    }
    if ('loop' in this.element.dataset) {
      this.options.loop = {
        loop: true,
      };
    }
    if ('slide' in this.element.dataset) {
      this.options.slidesPerView =
        {
          slidesPerView: 'auto',
        } || this.options.slidesPerView;
    }
  }
}
