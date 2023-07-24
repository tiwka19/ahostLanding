import '../styles/style.css';
import '../../node_modules/preline/dist/preline';
import EmblaCarousel from 'embla-carousel';
import { setupDotBtns, generateDotBtns, selectDotBtn } from './dotButtons';

const setupEmblaCarousel = (emblaNode, options) => {
  const viewPort = emblaNode.querySelector('.embla__viewport');

  const dots = emblaNode.querySelector('.embla__dots');
  console.log(dots);
  const embla = EmblaCarousel(viewPort, options);
  const dotsArray = generateDotBtns(dots, embla);
  const setSelectedDotBtn = selectDotBtn(dotsArray, embla);

  setupDotBtns(dotsArray, embla);

  embla.on('select', setSelectedDotBtn);
  embla.on('init', setSelectedDotBtn);
};

const options = { loop: false };
const emblaNodes = [].slice.call(document.querySelectorAll('.embla'));
const emblaCarousels = emblaNodes.map((emblaNode) => setupEmblaCarousel(emblaNode, options));

if (document.querySelector('.home')) {
  const $collapseEl = document.querySelector('#navbar-collapse-with-animation');
  const $scrollSpyEl = document.querySelector('[data-hs-scrollspy="#scrollspy"]');
  $scrollSpyEl.addEventListener('scroll.hs.scrollspy', () => {
    if (window.outerWidth <= 639 && $collapseEl.classList.contains('open')) {
      HSCollapse.hide($collapseEl);
    }
  });
}
