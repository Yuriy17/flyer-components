export const initNav = () => {
  const nav = document.querySelector('sl-tab-group.nav');
  const links = nav.querySelectorAll('.link');

  if (links?.length) {
    links.forEach((link) => {
      if (window.location.pathname === link.getAttribute('href')) {
        link.classList.add('active');
        nav.show(`${link.parentElement.getAttribute('panel')}`);
      }
    });
  }
};
