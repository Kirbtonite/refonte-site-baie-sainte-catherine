export default class Accordion {
  constructor(element) {
    this.element = element;
    this.accordions = this.element.querySelectorAll('.js-header');
    this.options = {
      notClosing: false,
      autoOpen: false,
    };
    this.init();
  }
  init() {
    this.setOptions();
    this.openAccordion();
    for (let i = 0; i < this.accordions.length; i++) {
      const accordion = this.accordions[i];
      accordion.addEventListener('click', this.closeAccordion.bind(this));
    }
  }

  setOptions() {
    if ('notClosing' in this.element.dataset) {
      this.options.notClosing = true;
    }
    if ('autoOpen' in this.element.dataset) {
      this.options.autoOpen = true;
    }
  }

  closeAccordion(event) {
    if (this.options.notClosing) {
      event.currentTarget.classList.toggle('is-active');
      console.log('what?');
    } else {
      for (let i = 0; i < this.accordions.length; i++) {
        const accordion = this.accordions[i];
        accordion.classList.remove('is-active');
        event.currentTarget.classList.add('is-active');
      }
    }
  }

  openAccordion() {
    if (this.options.autoOpen) {
      this.accordions[1].classList.add('is-active');
    }
  }
}
