// import Swiper JS + navigation
import Swiper from 'swiper';
import { Navigation, Scrollbar } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import { setHigherHeights } from '../utils/utils';
// import { debounce } from '../utils/debounce';

const initSlider = ({
  sliderBlock,
  // reviewBlocks,
  // reviews,
  // TrustScore,
  // ReviewsCount
}) => {
  // let reviewNav = '';
  // let reviewSlides = [];

  // if (innerWidth < 768) {
  //   reviewSlides = reviewBlocks
  //     .map((reviewBlock) =>
  //       reviewSlideTemplate({
  //         reviewBlocks: reviewBlock,
  //       })
  //     )
  //     .join('');
  // } else {
  //   reviewNav = reviewNavTemplate();
  //   for (let index = 0; index < reviews.length; index++) {
  //     const review = reviewBlocks[index];
  //     if (index % 2 === 0) {
  //       reviewSlides.push([review]);
  //     } else {
  //       reviewSlides[reviewSlides.length - 1].push(review);
  //     }
  //   }
  //   reviewSlides = reviewSlides
  //     .map((reviewSlideArr) =>
  //       reviewSlideTemplate({
  //         reviewBlocks: reviewSlideArr.join(''),
  //       })
  //     )
  //     .join('');
  // }
  // reviewsSection.innerHTML = reviewsTemplate({
  //   percentOfTrusted: Number.parseInt((TrustScore / 5) * 100, 10),
  //   reviewSlides,
  //   reviewsRate: TrustScore,
  //   reviewsCount: ReviewsCount,
  //   reviewNav,
  // });

  console.log("🚀 ~ swiper ~ sliderBlock.querySelector('.swiper'):", sliderBlock.querySelector('.swiper'));
  // init Swiper:
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(sliderBlock.querySelector('.swiper'), {
    scrollbar: {
      el: sliderBlock.querySelector('.swiper-scrollbar'),
      draggable: true,
      hide: false,
    },

    // Default parameters
    // configure Swiper to use modules
    modules: [Navigation, Scrollbar],
    navigation: {
      nextEl: sliderBlock.querySelector('.swiper-button-next'),
      prevEl: sliderBlock.querySelector('.swiper-button-prev'),
    },
    slidesPerView: 'auto',
    spaceBetween: 16,
    // Responsive breakpoints
    // breakpoints: {
    //   // when window width is >= 768px
    //   768: {
    //     slidesPerView: 3,
    //     spaceBetween: 12,
    //   },
    //   // when window width is >= 1024px
    //   1024: {
    //     slidesPerView: 4,
    //     spaceBetween: 12,
    //   },
    //   // when window width is >= 1440px
    //   1440: {
    //     slidesPerView: 5,
    //     spaceBetween: 16,
    //   },
    //   // when window width is >= 1920px
    //   1920: {
    //     slidesPerView: 6,
    //   },
    // },
  });
};

export const initHeroSlider = async ({ heroSection }) => {
  if(heroSection) {
    const sliderBlock = heroSection.querySelector('.hero__slider');
    if (sliderBlock) {
      initSlider({
        sliderBlock,
      });
      setHigherHeights(sliderBlock.querySelectorAll('.swiper-slide  .card__content'));
      //   const debouncedInitSlider = debounce(initSlider, 500);
      //   const params = {
      //     reviewBlocks,
      //     reviews,
      //     reviewsSection,
      //     TrustScore,
      //     ReviewsCount,
      //   };
      //   initSlider(params);
      //   addEventListener('resize', () => debouncedInitSlider(params));
    }
  }
};
