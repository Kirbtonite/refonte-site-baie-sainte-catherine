export default class Scrolly {
  constructor(element) {
    this.element = element;
    this.options = {
      rootMargin: '-50px',
      repeat: true,
    };
    this.init();
  }
  init() {
    this.setOptions();
    const observer = new IntersectionObserver(
      this.watch.bind(this),
      this.options
    );
    let items = this.element.querySelectorAll('[data-scrolly]');
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      observer.observe(item);
    }
  }
  setOptions() {
    // make animations to NOT repeat / faire es animations à NE PAS répéter
    if ('noRepeat' in this.element.dataset) {
      this.options.repeat = false;
    }
  }

  watch(entries, observer) {
    for (let i = 0; i < entries.length; i++) {
      const entry = entries[i];
      const target = entry.target;

      if (entry.isIntersecting) {
        target.classList.add('is-active');
        if (!this.options.repeat) {
          observer.unobserve(target);
        }
      } else {
        target.classList.remove('is-active');
      }
    }
  }
}
