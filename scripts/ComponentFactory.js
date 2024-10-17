// importer vos composantes ici
import Header from './components/Header';
import Scrolly from './components/Scrolly';
import Carousel from './components/Carousel';
import Youtube from './components/Youtube';
import Accordion from './components/Accordion';
import Form from './components/Form';
export default class ComponentFactory {
  constructor() {
    this.componentInstances = [];
    this.componentList = {
      Youtube,
      Carousel,
      Header,
      Scrolly,
      Accordion,
      Form,
      // Mettez votre liste de composantes ici
    };
    this.init();
  }

  init() {
    const components = document.querySelectorAll('[data-component]');

    for (let i = 0; i < components.length; i++) {
      const element = components[i];
      const componentName = element.dataset.component;

      if (this.componentList[componentName]) {
        const instance = new this.componentList[componentName](element);
        this.componentInstances.push(instance);
      } else {
        console.log(`La composante ${componentName} n'existe pas`);
      }
    }
  }
}
