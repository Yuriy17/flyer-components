export const preloader = document.querySelector('.preloader');
const solidLine = document.querySelector('.loader_solid_line');
const brokenLine = document.querySelector('.loader_broken_line');
const loaderText = document.querySelector('.loader-text');
const ways = document.querySelector('.loader-plane-ways');
let loading;

export const fade = async (element, fadeIn = true) => {
  let op = fadeIn ? 0.1 : 1;
  const displayStyle = fadeIn ? 'flex' : 'none';
  element.style.display = fadeIn ? 'flex' : element.style.display;

  const fadeEffect = () => {
    if ((fadeIn && op >= 1) || (!fadeIn && op <= 0.1)) {
      element.style.display = fadeIn ? 'flex' : displayStyle;
      element.style.opacity = fadeIn ? 1 : 0;
      return;
    }
    op += op * 0.1 * (fadeIn ? 1 : -1);
    element.style.opacity = op;
    element.style.filter = `alpha(opacity=${op * 100})`;
    requestAnimationFrame(fadeEffect);
  };
  requestAnimationFrame(fadeEffect);

  if (!fadeIn) {
    clearInterval(loading);
    setTimeout(() => {
      solidLine.style.width = '2%';
      brokenLine.style.width = '98%';
    }, 1000);
  }
};
export const unfade = async (element) => {
  let op = 0.1; // initial opacity
  element.style.display = 'flex';

  const fadeEffect = () => {
    if (op >= 1) {
      element.style.opacity = 1;
      return;
    }
    op += op * 0.1;
    element.style.opacity = op;
    element.style.filter = `alpha(opacity=${op * 100})`;
    requestAnimationFrame(fadeEffect);
  };
  requestAnimationFrame(fadeEffect);
};

export const setPreloader = async (state) => {
  let i = 2;
  const flightInfo = JSON.parse(localStorage.getItem('flightTicketInfo'));
  let way1 = null,
    way2 = null,
    from = null,
    to = null;
  // let way2 = null;
  switch (state) {
    case 'loading':
      loaderText.innerHTML = 'Loading<span>.</span><span>.</span><span>.</span>';
      break;
    case 'searching':
      loaderText.innerHTML =
        "We're searching for the best options<span>.</span><span>.</span><span>.</span><br>Please don't close this window";
      ways.style.display = 'flex';
      way1 = ways.querySelector('.loader-plane-ways-1');
      way2 = ways.querySelector('.loader-plane-ways-2');
      from = flightInfo.from[0];
      to = flightInfo.to[0];
      way1.querySelector('.loader-plane-ways-airport').textContent = from.cityName.split(' (')[0];
      way1.querySelector('.loader-plane-ways-code').textContent = from.cityCode;
      way2.querySelector('.loader-plane-ways-airport').textContent = to.cityName.split(' (')[0];
      way2.querySelector('.loader-plane-ways-code').textContent = to.cityCode;
      break;
    case 'searchingFinish':
      loaderText.innerHTML = 'We have completed the search and prepared best results for you';
      break;
  }

  loading = setInterval(() => {
    if (i <= 75) {
      solidLine.style.width = `${i}%`;
      brokenLine.style.width = `${100 - i}%`;
      i++;
    } else {
      clearInterval(loading);
    }
  }, 50);
};
