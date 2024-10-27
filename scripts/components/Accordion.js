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
    // for loop to make all accordions clickable / boucle for pour rend tous les accordéons cliquables
    for (let i = 0; i < this.accordions.length; i++) {
      const accordion = this.accordions[i];
      accordion.addEventListener('click', this.closeAccordion.bind(this));
    }
  }

  setOptions() {
    // make acordeons NOT close when others are open / faire que les arccordéons NE ferme PAS si d'autres sont ouverts
    if ('notClosing' in this.element.dataset) {
      this.options.notClosing = true;
    }
    // open selected accordion on page load / ouvre l'accordéon sélectionné au chargement de la page
    if ('autoOpen' in this.element.dataset) {
      this.options.autoOpen = true;
    }
  }

  closeAccordion(event) {
    if (this.options.notClosing) {
      event.currentTarget.classList.toggle('is-active');
    } else {
      // for loop to open the clicked accordions and close the reste / boucle for pour ouvrir l'accordéon cliqué et fermer le reste
      for (let i = 0; i < this.accordions.length; i++) {
        const accordion = this.accordions[i];
        accordion.classList.remove('is-active');
        event.currentTarget.classList.add('is-active');
      }
    }
  }

  openAccordion() {
    // add class on selected accordion to open on page load / ajouter une classe sur l'accordéon sélectionné pour l'ouvrir au chargement de la page
    if (this.options.autoOpen) {
      this.accordions[1].classList.add('is-active');
    }
  }
}
