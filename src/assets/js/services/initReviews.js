import axios from 'axios';
import reviewsTemplate from 'src/templates/layouts/sections/reviews/reviews.ejs';
import reviewTemplate from 'src/templates/layouts/sections/reviews/review.ejs';
import reviewNavTemplate from 'src/templates/layouts/sections/reviews/reviewsNavigation.ejs';
import reviewSlideTemplate from 'src/templates/layouts/sections/reviews/reviewsSlide.ejs';
import reviewStarTemplate from 'src/templates/components/reviewStars/reviewStar.ejs';
import reviewStarsTemplate from 'src/templates/components/reviewStars/reviewStars.ejs';
// import Swiper JS + navigation
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import { debounce } from '../utils/debounce';

const initSlider = ({ reviewBlocks, reviews, reviewsSection, TrustScore, ReviewsCount }) => {
  let reviewNav = '';
  let reviewSlides = [];

  if (innerWidth < 768) {
    reviewSlides = reviewBlocks
      .map((reviewBlock) =>
        reviewSlideTemplate({
          reviewBlocks: reviewBlock,
        })
      )
      .join('');
  } else {
    reviewNav = reviewNavTemplate();
    for (let index = 0; index < reviews.length; index++) {
      const review = reviewBlocks[index];
      if (index % 2 === 0) {
        reviewSlides.push([review]);
      } else {
        reviewSlides[reviewSlides.length - 1].push(review);
      }
    }
    reviewSlides = reviewSlides
      .map((reviewSlideArr) =>
        reviewSlideTemplate({
          reviewBlocks: reviewSlideArr.join(''),
        })
      )
      .join('');
  }
  reviewsSection.innerHTML = reviewsTemplate({
    percentOfTrusted: Number.parseInt((TrustScore / 5) * 100, 10),
    reviewSlides,
    reviewsRate: TrustScore,
    reviewsCount: ReviewsCount,
    reviewNav,
  });

  // init Swiper:
  // eslint-disable-next-line no-unused-vars
  const swiper = new Swiper(reviewsSection.querySelector('.swiper'), {
    // Default parameters
    // configure Swiper to use modules
    modules: [Navigation],
    navigation: {
      nextEl: reviewsSection.querySelector('.swiper-button-next'),
      prevEl: reviewsSection.querySelector('.swiper-button-prev'),
    },
    slidesPerView: 'auto',
    spaceBetween: 16,
    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 768px
      768: {
        slidesPerView: 3,
        spaceBetween: 12,
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 4,
        spaceBetween: 12,
      },
      // when window width is >= 1440px
      1440: {
        slidesPerView: 5,
        spaceBetween: 16,
      },
      // when window width is >= 1920px
      1920: {
        slidesPerView: 6,
      },
    },
  });
};

export const initReviews = async () => {
  const reviewsSection = document.querySelector('section.trustpilot-reviews');
  if (reviewsSection) {
    // TODO
    // const reviewsData = import.meta.env.PROD
    //   ? await axios.get('https://flyer-club.com/flightbooking/trustpilot?reviews=true&perpage=20')
    //   : await axios.get('/data/reviews.json');
    const reviewsData = await axios.get(`${import.meta.env.VITE_STATIC_PATH}/data/reviews.json`);

    const { TrustScore, ReviewsCount, reviews } = reviewsData.data;

    const reviewBlocks = reviews.map(({ reviewLink, title, text, clientName, createdAt, stars }) => {
      const starElements = [];
      for (let index = 1; index < 6; index++) {
        starElements.push(
          reviewStarTemplate({
            classes: index > stars ? '' : 'stars__star_active',
          })
        );
      }
      return reviewTemplate({
        reviewLink,
        stars: reviewStarsTemplate({
          classes: 'trustpilot-review__stars',
          starElements: starElements.join(''),
        }),
        title,
        text,
        clientName,
        date: new Date(createdAt).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric' }),
      });
    });

    const debouncedInitSlider = debounce(initSlider, 500);
    const params = {
      reviewBlocks,
      reviews,
      reviewsSection,
      TrustScore,
      ReviewsCount,
    };
    initSlider(params);
    addEventListener('resize', () => debouncedInitSlider(params));
  }
};
