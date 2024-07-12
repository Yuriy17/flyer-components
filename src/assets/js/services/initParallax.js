import SimpleParallax from 'simple-parallax-js/vanilla';

export const initParallax = () => {
  // Select all elements with the class 'parallax'
  const elements = document.querySelectorAll('.parallax img');

  for (let i = 0; i < elements.length; i++) {
    new SimpleParallax(elements[i], {
      // You can add plugin options here
      // delay: 0.6,
      orientation: 'up',
      scale: 1.4,
      transition: 'cubic-bezier(0,0,0,1)',
      customContainer: '',
      customWrapper: '',
    });
  }
};
