import '../pages/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import ModalWithImage from '../components/ModalWithImage.js';
import ModalWithForm from '../components/ModalWithForm.js';
import { 
  initialCards, 
  sectionSelector, 
  cardSelector, 
  objectOfValidation,
  editButton,
  addButton,
  imageModalSelector,
  editModalSelector,
  addModalSelector
} from '../utils/constants.js';


// Обёртки форм
const editForm = document.querySelector('.modal_act_edit-profile').querySelector('.modal__container');
const addForm = document.querySelector('.modal_act_add-card').querySelector('.modal__container');


// Функция добавления карточки в контейнер
const addCard = (data, cardSelector) => {
  const card = new Card({
    data: data,
    handleCardClick: (data) => {
      modalImage.open(data)
    }
  }, cardSelector);

  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}



// Инициализируем контейнер с карточками
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      addCard({ place: item.name, link: item.link }, cardSelector);
    }
  }, sectionSelector
); 
// Наполняем контейнер исходными карточками
cardList.renderItems();

// Инициализируем модальное окно увеличения изображения
const modalImage = new ModalWithImage(imageModalSelector);
modalImage.setEventListeners();

// Инициализируем модальное окно редактирования профиля
const modalEdit = new ModalWithForm(
  (data) => {
    profile.setUserInfo(data);
    modalEdit.close();
  }, editModalSelector
);
modalEdit.setEventListeners();

// Инициализируем модальное окно добавления карточки
const modalAdd = new ModalWithForm(
  (data) => {
    addCard(data, cardSelector);
    modalAdd.close();
  }, addModalSelector
);
modalAdd.setEventListeners();

// Инициализируем блок с данными пользователя
const profile = new UserInfo({ 
  userNameSelector: '.profile__name',
  userInfoSelector: '.profile__profession' 
});

// Запускаем валидацию форм
const editFormValidator = new FormValidator(objectOfValidation, editForm);
editFormValidator.enableValidation();

const addFormValidator = new FormValidator(objectOfValidation, addForm);
addFormValidator.enableValidation();

// Открываем модальное окно редактирования профиля по клику на кнопку редактирования
editButton.addEventListener('click', () => {
  // Заполняем поля формы информацией из профиля
  modalEdit.setInitialState(profile.getUserInfo());
  
  editFormValidator.resetValidation();
  modalEdit.open();
});

// Открываем модальное окно добавления изображений по клику на кнопку "+"
addButton.addEventListener('click', () => {  
  addFormValidator.resetValidation();
  modalAdd.open();
});
