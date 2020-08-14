const modalEnlarge = document.querySelector('.modal_act_enlarge-image');
const modalImage = modalEnlarge.querySelector('.modal__image');
const modalCaption = modalEnlarge.querySelector('.modal__image-caption');

// Функция открытия модального окна, добавляющая возможность закрытия модального 
// окна по нажатию клавиши "Escape"
function openModal(modal) {
  modal.classList.add('modal_active');
  document.body.addEventListener('keydown', handleEscape);
}


// Функция закрытия модального окна, убирающая возможность закрытия модального 
// окна по нажатию клавиши "Escape"
function closeModal(modal) {
  modal.classList.remove('modal_active');
  document.body.removeEventListener('keydown', handleEscape);
}


// Функция, вызывающая закрытие модального окна по нажатию клавиши "Escape"
function handleEscape(evt) {
  if (evt.key === 'Escape') {
    closeModal(document.querySelector('.modal_active'));
  }
}


// Метод увеличения карточек
function enlargeImage(card) {
  const cardCaption = card.querySelector('.card__heading');
  const cardImage = card.querySelector('.card__image');

  modalImage.src = cardImage.src;
  modalImage.alt = cardImage.alt;
  modalCaption.textContent = cardCaption.textContent;

  openModal(modalEnlarge);
}



export { enlargeImage, openModal, closeModal, handleEscape }