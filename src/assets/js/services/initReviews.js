import axios from 'axios';
import reviewsTemplate from 'src/templates/layouts/sections/reviews/reviews.ejs';
import reviewTemplate from 'src/templates/layouts/sections/reviews/review.ejs';
import reviewNavTemplate from 'src/templates/layouts/sections/reviews/reviewsNavigation.ejs';
import reviewSlideTemplate from 'src/templates/layouts/sections/reviews/reviewsSlide.ejs';
import reviewStarTemplate from 'src/templates/layouts/sections/reviews/reviewStar.ejs';
// import Swiper JS + navigation
import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';
// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';

export const initReviews = async () => {
  const reviewsSection = document.querySelector('section.trustpilot-reviews');
  if (reviewsSection) {
    const reviewsData = import.meta.env.PROD
      ? await axios.get('https://flyer-club.com/flightbooking/trustpilot?reviews=true&perpage=20')
      : await axios.get('/data/reviews.json');

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
        starElements: starElements.join(''),
        title,
        text,
        clientName,
        date: new Date(createdAt).toLocaleDateString('en-US', { weekday: 'long', day: 'numeric' }),
      });
    });
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

    if (reviewsSection) {
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
          // when window width is >= 480px
          768: {
            slidesPerView: 3,
            spaceBetween: 12,
          },
          // when window width is >= 640px
          1024: {
            slidesPerView: 4,
            spaceBetween: 12,
          },
          // when window width is >= 640px
          1440: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
        },
      });
    }
  }
};
