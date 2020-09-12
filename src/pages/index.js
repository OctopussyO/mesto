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
  editProfileButton,
  editAvatarButton,
  addCardButton,
  imagePopupSelector,
  editPopupSelector,
  addPopupSelector,
  confirmPopupSelector,
  avatarPopupSelector
} from '../utils/constants.js';
import PopupWithSubmit from '../components/PopupWithSubmit';


// Обёртки форм
const editProfileForm = document.querySelector(editPopupSelector).querySelector('.popup__container');
const editAvatarForm = document.querySelector(avatarPopupSelector).querySelector('.popup__container');
const addCardForm = document.querySelector(addPopupSelector).querySelector('.popup__container');


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
  userInfoSelector: '.profile__profession',
  userAvatarSelector: '.profile__image'
});

// Запускаем валидацию форм
const editProfileFormValidator = new FormValidator(objectOfValidation, editProfileForm);
editProfileFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(objectOfValidation, editAvatarForm);
editAvatarFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(objectOfValidation, addCardForm);
addCardFormValidator.enableValidation();

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
editProfileButton.addEventListener('click', () => {
  // Заполняем поля формы информацией из профиля
  popupEdit.setInitialState(profile.getUserInfo());
  
  editProfileFormValidator.resetValidation();
  popupEdit.open();
});

// // Открываем модальное окно добавления изображений по клику на кнопку "+"
// addCardButton.addEventListener('click', () => {  
//   addCardFormValidator.resetValidation();
//   popupAdd.open();
// });


Promise.all([api.getData(), api.getUserData()])
  .then(([initialCards, userData]) => {
    profile.setUserInfo({name: userData.name, info: userData.about});
    profile.setUserAvatar(userData.avatar);

    const addCard = (data, cardSelector) => {
      const card = new Card({
        data: data,
        handleCardClick: (data) => {
          popupImage.open(data)
        },
        handleLikeClick: () => {
          const handleLikeClick = !this.likes.some(item => item._id === userData._id)
            ? api.likeItem(data._id)
            : api.unlikeItem(data._id);

          handleLikeClick
            .then((data) => {
              this.likes = data.likes;
              this.setLikesQuantity();
            })
            .catch((err) => {
              console.log(err)
            });
        },
        handleDeleteClick: () => {
          popupDelete.open();
          popupDelete.setSubmitMethod (() => {
            api.deleteItem(data._id);
            popupDelete.close();
          });
        }
      }, cardSelector);
    
      const cardElement = card.generateCard();

      if (card.likes.some(item => item._id === userData._id)) {
        cardElement.querySelector('.card__button_act_like').classList.add('card__button_active');
      }

      if (data.owner._id !== userData._id) {
        cardElement.querySelector('.card__button_act_delete').style.display = "none";
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
        api.saveNewItem({ name: data.place, link: data.link })
          .then(data => {
            addCard(data, cardSelector)
            popupAdd.close();
          });
      }, addPopupSelector
    );
    popupAdd.setEventListeners();

    // Открываем модальное окно добавления изображений по клику на кнопку "+"
    addCardButton.addEventListener('click', () => {  
      addCardFormValidator.resetValidation();
      popupAdd.open();
    });

    // Инициализируем модальное окно редактирования профиля
    const popupEdit = new PopupWithForm(
      (data) => {
        profile.setUserInfo(data);
        popupEdit.close();
        api.saveUserData({ name: data.name, about: data.info })
      }, editPopupSelector
    );
    popupEdit.setEventListeners();



    const popupAvatar = new PopupWithForm(
      (data) => {
        profile.setUserAvatar(data.avatar);
        popupAvatar.close();
        api.saveUserAvatar(data);
      }, avatarPopupSelector
    );
    popupAvatar.setEventListeners();

    editAvatarButton.addEventListener('click', () => {
      editAvatarFormValidator.resetValidation();
      popupAvatar.open();
    });

    // Инициализируем модальное окно подтверждения удаления
    const popupDelete = new PopupWithSubmit(confirmPopupSelector);
    popupDelete.setEventListeners();
  })
  .catch()
  .finally()
