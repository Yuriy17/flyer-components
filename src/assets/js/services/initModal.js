import { inputTel } from './phones';
import modalGetFreeQuote from '../../../templates/layouts/modalContent/modalGetFreeQuote.ejs';
import modalSuccess from '../../../templates/layouts/modalContent/modalSuccess.ejs';
import modalClassUp from '../../../templates/layouts/modalContent/modalClassUp.ejs';
import Modal from '../layouts/Modal';

export default function initModal() {
  const openModalBtns = document.querySelectorAll('.btn');
  const link_infos = document.querySelectorAll('.link_info');
  const body = document.querySelector('body');
  body.insertAdjacentHTML(
    'beforeend',
    Modal({
      content: modalGetFreeQuote(),
    })
  );

  inputTel('.modal-form');

  body.insertAdjacentHTML(
    'beforeend',
    Modal({
      content: modalClassUp(),
    })
  );

  inputTel('.modal-subscribe-form');

  const btnSubscribe = document.querySelectorAll('.btn-subscribe');
  btnSubscribe.forEach((item) => {
    item.addEventListener('click', () => openModal('.modal-subscribe-form'));
  });

  body.insertAdjacentHTML(
    'beforeend',
    Modal({
      classes: 'modal-success',
      content: modalSuccess(),
    })
  );

  const modals = document.querySelectorAll('.modal');
  const closeModals = document.querySelectorAll('.closeBTN');

  closeModals.forEach((item) => {
    item.addEventListener('click', () => {
      item.closest('.modal').style.display = 'none';
      if (!item.closest('.modal-success')) {
        if (item.closest('.modal-subscribe-form')) {
          modalShowed = 1;
          if (localStorage.getItem('closeModalCount') && localStorage.getItem('closeModalCount') != 2) {
            localStorage.setItem('closeModalCount', Number(localStorage.getItem('closeModalCount')) + 1);
          } else {
            localStorage.setItem('closeModalCount', 1);
          }
        }
      } else {
        document.location.reload();
      }
    });
  });

  openModalBtns.forEach((openModalBtn) => {
    openModalBtn.addEventListener('click', () => openModal('.modal-form'));
  });
  link_infos.forEach((item) => {
    item.addEventListener('click', () => {
      if (document.querySelector('.menu_block').classList.contains('active')) {
        document.querySelector('.menu_block').classList.remove('active');
      }
      openModal('.modal-form');
    });
  });

  window.addEventListener('click', (event) => {
    if (event.target.classList.contains('modal') && !event.target.classList.contains('modal-success')) {
      modals.forEach((item) => {
        item.style.display = 'none';
        if (item.querySelector('.modal-subscribe-form')) {
          modalShowed = 1;
          if (localStorage.getItem('closeModalCount') && localStorage.getItem('closeModalCount') != 2) {
            localStorage.setItem('closeModalCount', Number(localStorage.getItem('closeModalCount')) + 1);
          } else {
            localStorage.setItem('closeModalCount', 1);
          }
        }
      });
    }
  });

  function openModal(modalClassName) {
    document.querySelector(modalClassName).closest('.modal').style.display = 'block';
  }

  resetTimeout();

  let timer = 15000;
  let timerID;
  let modalShowed = 0;
  function resetTimeout() {
    let closeModalCount = 0;
    if (localStorage.getItem('closeModalCount')) {
      closeModalCount = Number(localStorage.getItem('closeModalCount'));
    }
    if (closeModalCount >= 2 || localStorage.getItem('subscribed')) {
      return;
    }
    document.addEventListener('mousemove', () => {
      if (modalShowed == 0) {
        timer = 15000;
        clearTimeout(timerID);
        timerID = setTimeout(() => openModal('.modal-subscribe-form'), timer);
      } else {
        clearTimeout(timerID);
      }
    });
    document.addEventListener('keypress', () => {
      if (modalShowed == 0) {
        timer = 15000;
        clearTimeout(timerID);
        timerID = setTimeout(() => openModal('.modal-subscribe-form'), timer);
      } else {
        clearTimeout(timerID);
      }
    });
  }
}
