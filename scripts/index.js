import { initialCards, sectionSelector, cardSelector } from './utils/data.js';
import { openModal, closeModal } from './utils/utils.js';
import Card from './components/Card.js';
import { FormValidator, objectOfValidation } from './components/FormValidator.js';
import Section from './components/Section.js';


// Обёртки
const profile = document.querySelector('.profile');
const cardsContainer = document.querySelector('.gallery');
const modalEdit = document.querySelector('.modal_act_edit-profile');
const formEdit = modalEdit.querySelector('.modal__container');
const modalAdd = document.querySelector('.modal_act_add-card');
const formAdd = modalAdd.querySelector('.modal__container');
const modalOverlays = Array.from(document.querySelectorAll('.modal'));

// Данные полей форм
const nameInput = formEdit.querySelector('.modal__input[name="modal-name"]');
const jobInput = formEdit.querySelector('.modal__input[name="modal-job"]');
const placeInput = formAdd.querySelector('.modal__input[name="modal-place"]');
const linkInput = formAdd.querySelector('.modal__input[name="modal-link"]');

// Кнопки
const editButton = profile.querySelector('.profile__edit-button');
const addButton = profile.querySelector('.profile__add-button');
const closeButtons = Array.from(document.querySelectorAll('.modal__close-button'));

// Прочие элементы DOM
const name = profile.querySelector('.profile__name');
const job = profile.querySelector('.profile__profession');



// Функция-обработчик отправки формы редактирования профиля
const handleEditFormSubmit = (evt) => {
  evt.preventDefault(); // Отменяем стандартную отправку формы.

  name.textContent = nameInput.value;
  job.textContent = jobInput.value;

  closeModal(modalEdit);
}


// Функция-обработчик отправки формы добавления карточек
const handleAddFormSubmit = (evt) => {
  evt.preventDefault();

  addCard(placeInput.value, linkInput.value, '.card-template');

  closeModal(modalAdd);
  
  // Очищаем поля input
  formAdd.reset();
}

// // Функция добавления карточки в контейнер
// const addCard = (name, link, cardSelector) => {
//   const card = new Card(name, link, cardSelector);
//   const cardElement = card.generateCard();

//   cardsContainer.prepend(cardElement);
// }


const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item.name, item.link, cardSelector);
      const cardElement = card.generateCard();

      cardList.addItem(cardElement);
    }
  }, sectionSelector
); 

cardList.renderItems();

// Добавляем исходные карточки
// initialCards.forEach(item => {
//   addCard(item.name, item.link, '.card-template');
// });


// Запускаем валидацию форм
const formEditValidator = new FormValidator(objectOfValidation, formEdit);
formEditValidator.enableValidation();

const formAddValidator = new FormValidator(objectOfValidation, formAdd);
formAddValidator.enableValidation();


// Открываем модальное окно редактирования профиля по клику на кнопку редактирования
editButton.addEventListener('click', () => {
  // При открытии модального окна добавляем слушатели на кнопки форм
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;

  formEditValidator.resetValidation();

  openModal(modalEdit);
});

formEdit.addEventListener('submit', handleEditFormSubmit);


// Открываем модальное окно добавления изображений по клику на кнопку "+"
addButton.addEventListener('click', () => {
  // При открытии модального окна очищаем поля формы
  formAdd.reset();

  formAddValidator.resetValidation();
  
  openModal(modalAdd);
});

formAdd.addEventListener('submit', handleAddFormSubmit);


// Закрытие модальных окон по клику на "Х"
closeButtons.forEach(function (button) {
  button.addEventListener('click', evt => {
    closeModal(evt.target.closest('.modal'));
    // evt.stopPropagation();
  });
});


// Закрытие модальных окон по клику вне контейнера
modalOverlays.forEach(function (modal) {
  modal.addEventListener('mousedown', evt => {
    if (!evt.target.closest('.modal__container')) {
      closeModal(evt.currentTarget);
    }
  });
});
