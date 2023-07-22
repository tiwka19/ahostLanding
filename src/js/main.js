import '../styles/style.css';
import '../../node_modules/preline/dist/preline';
import EmblaCarousel from 'embla-carousel';
import AutoHeight from 'embla-carousel-auto-height';

import { addDotBtnsAndClickHandlers } from './slider-dots.js';

const emblaNode = document.querySelector('.embla');
const viewportNode = emblaNode.querySelector('.embla__viewport');
const dotsNode = document.querySelector('.embla__dots');

let emblaApi = EmblaCarousel(viewportNode, { loop: true, containScroll: 'trimSnaps' });

const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(emblaApi, dotsNode);

emblaApi.on('destroy', removeDotBtnsAndClickHandlers);

const $collapseEl = document.querySelector('#navbar-collapse-with-animation');
const $scrollSpyEl = document.querySelector('[data-hs-scrollspy="#scrollspy"]');
$scrollSpyEl.addEventListener('scroll.hs.scrollspy', () => {
  if (window.outerWidth <= 639 && $collapseEl.classList.contains('open')) {
    HSCollapse.hide($collapseEl);
  }
});
