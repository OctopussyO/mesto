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


// // Функция добавления карточки в контейнер
// const addCard = (data, cardSelector) => {
//   const card = new Card({
//     data: data,
//     handleCardClick: (data) => {
//       popupImage.open(data)
//     }
//     // handleLikeClick: (likes) => {
//     //   if (likes.indexOf(userId) !== -1) {

//     //   }
//     // }
//   }, cardSelector);

//   const cardElement = card.generateCard();
//   cardList.addItem(cardElement);
// }

// const handleAnswerError = (err) => {
//   console.log(err);
// }


// // Инициализируем контейнер с карточками
// const cardList = new Section(
//   {
//     items: [],
//     renderer: (item) => {
//       addCard(item, cardSelector);
//     }
//   }, sectionSelector
// ); 

// Инициализируем модальное окно увеличения изображения
const popupImage = new PopupWithImage(imagePopupSelector);
popupImage.setEventListeners();

// Инициализируем модальное окно редактирования профиля
const popupEdit = new PopupWithForm(
  (data) => {
    profile.setUserInfo(data);
    popupEdit.close();
    api.saveUserData({ name: data.name, about: data.info })
  }, editPopupSelector
);
popupEdit.setEventListeners();

// // Инициализируем модальное окно добавления карточки
// const popupAdd = new PopupWithForm(
//   (data) => {
//     addCard({ name: data.place, link: data.link, likes: [] }, cardSelector);
//     popupAdd.close();
//     api.saveNewItem({ name: data.place, link: data.link });
//   }, addPopupSelector
// );
// popupAdd.setEventListeners();

// const popupAvatar = new PopupWithForm(
//   (data) => {

//   }
// )

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

// // Получаем данные пользователя с сервера и заполняем поля профиля
// api.getUserData()
//   .then((data) => {
//     console.log(data)
//     profile.setUserInfo({name: data.name, info: data.about});
//   })
//   .catch(handleAnswerError);


// // Получаем карточки с сервера и наполняем контейнер
// api.getData()
//   .then(data => {
//     console.log(data)
//     cardList.renderItems(data);
//   })
//   .catch(handleAnswerError);


// Открываем модальное окно редактирования профиля по клику на кнопку редактирования
editButton.addEventListener('click', () => {
  // Заполняем поля формы информацией из профиля
  popupEdit.setInitialState(profile.getUserInfo());
  
  editFormValidator.resetValidation();
  popupEdit.open();
});

// // Открываем модальное окно добавления изображений по клику на кнопку "+"
// addButton.addEventListener('click', () => {  
//   addFormValidator.resetValidation();
//   popupAdd.open();
// });


Promise.all([api.getData(), api.getUserData()])
  .then(([initialCards, userData]) => {
    // console.log(initialCards, userData);
    profile.setUserInfo({name: userData.name, info: userData.about});

    const addCard = (data, cardSelector) => {
      const card = new Card({
        data: data,
        handleCardClick: (data) => {
          popupImage.open(data)
        },
        handleLikeClick: () => {     
          if (!card.likes.some(item => item._id === userData._id)) {
            return api.likeItem(data._id)
          } else {
            return api.unlikeItem(data._id)
          }
        }
      }, cardSelector);
    
      const cardElement = card.generateCard();

      if (card.likes.some(item => item._id === userData._id)) {
        cardElement.querySelector('.card__button_act_like').classList.add('card__button_active');
      }
  

      cardList.addItem(cardElement);
    }

    const cardList = new Section(
      {
        items: initialCards,
        renderer: (item) => {
          addCard(item, cardSelector);
        }
      }, sectionSelector
    ); 
    cardList.renderItems();

    const popupAdd = new PopupWithForm(
      (data) => {
        // addCard({ name: data.place, link: data.link, likes: [] }, cardSelector);
        api.saveNewItem({ name: data.place, link: data.link }).then(data => {
          addCard(data, cardSelector)
          popupAdd.close();
        });
      }, addPopupSelector
    );
    popupAdd.setEventListeners();

    // Открываем модальное окно добавления изображений по клику на кнопку "+"
    addButton.addEventListener('click', () => {  
      addFormValidator.resetValidation();
      popupAdd.open();
    });
  })

//   // Функция добавления карточки в контейнер
// const addCard = (data, cardSelector) => {
//   const card = new Card({
//     data: data,
//     handleCardClick: (data) => {
//       popupImage.open(data)
//     }
//     // handleLikeClick: (likes) => {
//     //   if (likes.indexOf(userId) !== -1) {

//     //   }
//     // }
//   }, cardSelector);

//   const cardElement = card.generateCard();
//   cardList.addItem(cardElement);
// }