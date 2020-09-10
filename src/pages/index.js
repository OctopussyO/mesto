import '../pages/index.css';

import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import Api from '../components/Api.js';
import { 
  // initialCards, 
  sectionSelector, 
  cardSelector, 
  objectOfValidation,
  editButton,
  addButton,
  imagePopupSelector,
  editPopupSelector,
  addPopupSelector
} from '../utils/constants.js';


// Обёртки форм
const editForm = document.querySelector('.popup_act_edit-profile').querySelector('.popup__container');
const addForm = document.querySelector('.popup_act_add-card').querySelector('.popup__container');


// Функция добавления карточки в контейнер
const addCard = (data, cardSelector) => {
  const card = new Card({
    data: data,
    handleCardClick: (data) => {
      popupImage.open(data)
    }
  }, cardSelector);

  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
}

const handleAnswerError = (err) => {
  console.log(err);
}



// // Инициализируем контейнер с карточками
// const cardList = new Section(
//   {
//     items: initialCards,
//     renderer: (item) => {
//       addCard({ place: item.name, link: item.link }, cardSelector);
//     }
//   }, sectionSelector
// ); 
// // Наполняем контейнер исходными карточками
// cardList.renderItems();



// *****ВНИМАНИЕ***** Это наверняка надо убрать, но как ?!

// Инициализируем контейнер с карточками
const cardList = new Section(
  {
    items: [],
    renderer: (item) => {
      addCard({ place: item.name, link: item.link }, cardSelector);
    }
  }, sectionSelector
); 
// Наполняем контейнер исходными карточками
cardList.renderItems();

// Инициализируем модальное окно увеличения изображения
const popupImage = new PopupWithImage(imagePopupSelector);
popupImage.setEventListeners();

// Инициализируем модальное окно редактирования профиля
const popupEdit = new PopupWithForm(
  (data) => {
    profile.setUserInfo(data);
    api.saveUserInfo({ name: data.name, about: data.info })
    popupEdit.close();
  }, editPopupSelector
);
popupEdit.setEventListeners();

// Инициализируем модальное окно добавления карточки
const popupAdd = new PopupWithForm(
  (data) => {
    addCard(data, cardSelector);
    popupAdd.close();
  }, addPopupSelector
);
popupAdd.setEventListeners();

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

// Инициализируем API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-15',
  headers: {
    authorization: '584f4afd-78a5-47f8-908c-ac61484f6bb9',
    'Content-Type': 'application/json'
  }
})

// Получаем данные пользователя с сервера и заполняем поля профиля
api.getUserInfo()
  .then((data) => {
    console.log(data)
    profile.setUserInfo({name: data.name, info: data.about});
  })
  .catch(handleAnswerError);

api.getInitialCards()
  .then(data => {
    console.log(data)
    data.forEach((item) => {
      addCard({ place: item.name, link: item.link }, cardSelector);
    })
  })
  .catch(handleAnswerError);


  // // Инициализируем контейнер с карточками
// const cardList = new Section(
//   {
//     items: initialCards,
//     renderer: (item) => {
//       addCard({ place: item.name, link: item.link }, cardSelector);
//     }
//   }, sectionSelector
// ); 
// // Наполняем контейнер исходными карточками
// cardList.renderItems();

// Открываем модальное окно редактирования профиля по клику на кнопку редактирования
editButton.addEventListener('click', () => {
  // Заполняем поля формы информацией из профиля
  popupEdit.setInitialState(profile.getUserInfo());
  
  editFormValidator.resetValidation();
  popupEdit.open();
});

// Открываем модальное окно добавления изображений по клику на кнопку "+"
addButton.addEventListener('click', () => {  
  addFormValidator.resetValidation();
  popupAdd.open();
});
